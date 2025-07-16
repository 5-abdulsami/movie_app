import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { User } from "../types/index"
import { authAPI } from "../services/api"
// import localStorage constants
import {
  LS_AUTH_TOKEN,
  LS_USER_DATA,
  FE_LOGIN_FAILED,
  FE_REGISTER_FAILED,
} from "../constants/appConstants"


// Define the full state interface that will be part of the context value
// This should match the structure of 'state' in your reducer, PLUS the functions
interface AuthStateContext {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Define the interface for the context value that 'useAuth' will return
// This merges the state properties with the action functions
interface AuthContextType extends AuthStateContext {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define the action types for the reducer
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; token: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean }

// Change initialState to directly use AuthStateContext
const initialState: AuthStateContext = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem(LS_AUTH_TOKEN) : null, 
  isLoading: false,
  isAuthenticated: false,
  error: null,
}

// Define the reducer function
const authReducer = (state: AuthStateContext, action: AuthAction): AuthStateContext => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }
    case "AUTH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      // Check if localStorage is available for server-side rendering
      const token = typeof window !== 'undefined' ? localStorage.getItem(LS_AUTH_TOKEN) : null 
      if (token) {
        try {
          dispatch({ type: "SET_LOADING", payload: true })
          const response = await authAPI.getMe()
          if (response.success && response.user) {
            dispatch({
              type: "AUTH_SUCCESS",
              payload: { user: response.user, token },
            })
          } else {
            // Only remove from localStorage if it's available
            if (typeof window !== 'undefined') {
              localStorage.removeItem(LS_AUTH_TOKEN) 
              localStorage.removeItem(LS_USER_DATA)  
            }
          }
        } catch (error) {
          // Only remove from localStorage if it's available
          if (typeof window !== 'undefined') {
            localStorage.removeItem(LS_AUTH_TOKEN) 
            localStorage.removeItem(LS_USER_DATA)  
          }
        } finally {
          dispatch({ type: "SET_LOADING", payload: false })
        }
      }
    }

    checkAuth()
  }, [])

  // The login and signup functions will call the API and update the context state
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "AUTH_START" })
      const response = await authAPI.login({ email, password })

      // Check if the response is successful and contains user and token
      if (response.success && response.user && response.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LS_AUTH_TOKEN, response.token) 
          localStorage.setItem(LS_USER_DATA, JSON.stringify(response.user)) 
        }
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: response.user, token: response.token },
        })
      } else {
        throw new Error(response.message || FE_LOGIN_FAILED) 
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || FE_LOGIN_FAILED 
      dispatch({ type: "AUTH_FAILURE", payload: errorMessage })
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: "AUTH_START" })
      const response = await authAPI.register({ name, email, password })

      if (response.success && response.user && response.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LS_AUTH_TOKEN, response.token) 
          localStorage.setItem(LS_USER_DATA, JSON.stringify(response.user)) 
        }
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: response.user, token: response.token },
        })
      } else {
        throw new Error(response.message || FE_REGISTER_FAILED) 
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || FE_REGISTER_FAILED 
      dispatch({ type: "AUTH_FAILURE", payload: errorMessage })
      throw error
    }
  }

  // The logout function clears the user data from localStorage and updates the state
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LS_AUTH_TOKEN) 
      localStorage.removeItem(LS_USER_DATA)  
    }
    dispatch({ type: "LOGOUT" })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  // The value provided to the context should include all state properties and functions
  const value: AuthContextType = {
    ...state, // Spread all properties from AuthStateContext
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // This is a developer-facing error, usually kept as a literal string
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}