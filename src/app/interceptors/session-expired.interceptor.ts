import { Injectable } from '@angular/core';
import { switchMap } from "rxjs";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../interfaces/login-response';

@Injectable()
export class SessionExpiredInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any ) => {
        if( error instanceof HttpErrorResponse && error.status === 401){
          const refreshToken = this.authService.getRefreshToken();
          this.authService.deleteToken()
          if( refreshToken ){
            return this.authService.refreshToken().pipe(
              switchMap((response: LoginResponse) => {
                this.authService.saveLoginInfo(response);

                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.Token}`
                  }
                });

                return next.handle( request );
              }),
              catchError(( error ) => {
                // this.authService.logout();
                return throwError(() => error);
              })
            )
          }else{
            // this.authService.logout();
          }
        }

        return throwError( () => error );
      })
    );
  }
}
