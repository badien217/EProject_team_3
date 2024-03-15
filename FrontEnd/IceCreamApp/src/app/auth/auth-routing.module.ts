import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: 'auth/login',
    title: 'Login',
    component: LoginClientComponent
  },
  {
    path: 'auth/register',
    title: 'Register',
    component: RegisterComponent
  },
  {
    path: 'auth/admin/login-admin',
    title: 'Login Admin',
    component: LoginAdminComponent
  },
  {
    path: 'auth/forgot-password',
    title: 'Forgot Password',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
