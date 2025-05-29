import React, { createContext, useEffect, useReducer, useContext } from 'react';
import api from '@/services/api';
import { AuthReducer } from './AuthReducer';
import { AuthState, AuthContextType, LoginCredentials, SignupCredentials, User } from './types';

const INITIAL_STATE: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await api.post('/auth/login', credentials); // Use the imported api instance

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.success && response.data.user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid credentials";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    dispatch({ type: "SIGNUP_START" });
    try {
      const response = await api.post('/auth/register', {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.success && response.data.user) {
        dispatch({ type: "SIGNUP_SUCCESS", payload: response.data.user });
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";
      dispatch({ type: "SIGNUP_FAILURE", payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("adminPassword");
      dispatch({ type: "LOGOUT" });
    }
  };

  const updateUser = (user: User) => {
    dispatch({ type: "UPDATE_USER", payload: user });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally fetch /me here and dispatch LOGIN_SUCCESS or UPDATE_USER
      // if the user data is returned
      const fetchUser = async () => {
        try {
          const response = await api.get('/auth/me'); // Assuming a /auth/me endpoint
          if (response.data.success && response.data.data) {
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data });
          } else {
            // If token is invalid or fetching fails, clear token
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT" });
          }
        } catch (error) {
          console.error("Failed to fetch user on load:", error);
          // If an error occurs, clear token
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        }
      };
      fetchUser();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
