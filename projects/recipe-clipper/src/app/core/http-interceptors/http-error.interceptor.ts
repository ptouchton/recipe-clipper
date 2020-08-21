import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, mergeMap, catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
    private auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.auth.loggedIn) {
      return this.auth.getTokenSilently$().pipe(
        mergeMap(token => {
          const tokenReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(tokenReq);
  
        })
      );
  
    } else {

      return next.handle(request).pipe(
        tap({
          error: (err: any) => {
            if (err instanceof HttpErrorResponse) {
              const appErrorHandler = this.injector.get(ErrorHandler);
              appErrorHandler.handleError(err);
            }
          }
        })
      );
  
    }
 
  }

  // getToken$(): Observable<string> {
  //   return this.auth.getTokenSilently$();
  // }

}

