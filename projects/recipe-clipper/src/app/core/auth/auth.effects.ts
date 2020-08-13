import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { authLogin, authLogout, authComplete, authSuccess, authFailure } from './auth.actions';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private auth: AuthService
  ) { }

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() => this.auth.login())
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
            catchError(err => of(authFailure()))
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

  logout = createEffect(
        () =>
          this.actions$.pipe(
            ofType(authLogout),
            tap(() => {
              this.router.navigate(['']);
              this.auth.logout();
            })
          ),
        { dispatch: false }
      );
}
