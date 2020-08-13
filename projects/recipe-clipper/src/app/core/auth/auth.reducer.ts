import { AuthState } from './auth.models';
import { authLogin, authLogout, authComplete, authSuccess } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(authLogin, (state) => ({ ...state, isAuthenticated: false })),
  on(authLogout, (state) => ({ ...state, isAuthenticated: false })),
  on(authComplete, (state) => ({ ...state, isAuthenticated: false })),
  on(authSuccess, (state) => ({ ...state, isAuthenticated: true }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
