import { createAction, props } from '@ngrx/store';

export const authLogin = createAction('[Auth] Login');
export const authComplete = createAction('[Auth] Login Complete');
export const authSuccess = createAction('[Auth] Login Success');
export const authFailure = createAction('[Auth] Login Failure', props<{ error: string; }>());
export const authLogout = createAction('[Auth] Logout');
