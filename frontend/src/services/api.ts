import axios from "axios"
import type { LoginData, RegisterData, ApiResponse } from "../types"
// import endpoints and constants
import {
  LS_AUTH_TOKEN,
  LS_USER_DATA,
  API_AUTH_REGISTER,
  API_AUTH_LOGIN,
  API_AUTH_ME,
  API_AUTH_LOGOUT,
  PATH_LOGIN,
} from "../constants/appConstants"


// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LS_AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LS_AUTH_TOKEN)
      localStorage.removeItem(LS_USER_DATA)
      window.location.href = PATH_LOGIN
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  register: async (userData: RegisterData): Promise<ApiResponse> => {
    const response = await api.post(API_AUTH_REGISTER, userData)
    return response.data
  },

  login: async (userData: LoginData): Promise<ApiResponse> => {
    const response = await api.post(API_AUTH_LOGIN, userData)
    return response.data
  },

  getMe: async (): Promise<ApiResponse> => {
    const response = await api.get(API_AUTH_ME)
    return response.data
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await api.post(API_AUTH_LOGOUT)
    return response.data
  },
}

export default api