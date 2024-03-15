import { TestBed } from '@angular/core/testing';

import { TokenClientLoginInterceptor } from './token-client-login.interceptor';

describe('TokenClientLoginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenClientLoginInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenClientLoginInterceptor = TestBed.inject(TokenClientLoginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
