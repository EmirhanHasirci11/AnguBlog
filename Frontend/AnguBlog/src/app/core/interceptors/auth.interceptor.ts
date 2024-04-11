import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService = inject(CookieService)
    const helper = inject(interceptorHelper)
    if (helper.shouldInterceptRequest(req)) {
      const authRequest = req.clone({
        setHeaders: {
          'Authorization':cookieService.get('Authorization')
        }
      
      });
      console.log(authRequest);
      

      return next(authRequest);
    }
    return next(req);
  
  
  
};
export class interceptorHelper{
  public shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1? true: false;
  }
}
