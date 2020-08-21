import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';


import { authLogin, authLogout, authComplete, authSuccess, authFailure } from './auth.actions';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { NotificationService } from '../notifications/notification.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private notificationsService: NotificationService,
    private router: Router,
    private auth: AuthService
  ) { }

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() => this.auth.login('/call-back'))
      ),
    { dispatch: false }
  );

  loginComplete = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authComplete),
        exhaustMap(() => {
          return this.auth.isAuthenticated$.pipe(
            map((authResult: Boolean) => {
              if (authResult) {
                return authSuccess();
              }
            }),
            catchError(err => of(authFailure(err)))
          )
        })
      )
  );


  loginRedirect = createEffect(
    () =>
    this.actions$.pipe(
      ofType(authSuccess),
      tap(() => {
        this.router.navigate(['/about']);
      })
    ),
    { dispatch: false }
  );

  loginFailure = createEffect(
    () => 
    this.actions$.pipe(
      ofType(authFailure),
      tap((payload) => {
        this.notificationsService.error(payload.error);
      })
    )
  );

  logout = createEffect(
        () =>
          this.actions$.pipe(
            ofType(authLogout),
            tap(() => {
              // this.router.navigate(['/about']);
              this.auth.logout();
            })
          ),
        { dispatch: false }
      );
}
