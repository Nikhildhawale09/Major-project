import { AuthState, User } from './types';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP_START' }
  | { type: 'SIGNUP_SUCCESS'; payload: User }
  | { type: 'SIGNUP_FAILURE'; payload: string }
  | { type: 'UPDATE_USER'; payload: User };

// 🔄 Handles auth state transitions
export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
    case "SIGNUP_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
    case "SIGNUP_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
