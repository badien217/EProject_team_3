import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private inject : Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth_services = this.inject.get(AuthenticationService);
    let authreq = req;
    authreq = this.AddTokenheader(req,auth_services.GetToken);
    return next.handle(authreq).pipe(
      catchError(errordata => {
        if (errordata.status === 401) {
          
          auth_services.logout();
          
         return this.handleRefrehToken(req, next);
        }
        return throwError(errordata);
      })
    );

  }
  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(AuthenticationService);
    return authservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        authservice.SaveTokens(data);
        return next.handle(this.AddTokenheader(request,data.jwtToken))
      }),
      catchError(errodata=>{
        authservice.logout();
        return throwError(errodata)
      })
    );
  }
  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }
}
