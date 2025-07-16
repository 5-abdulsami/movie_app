import type { Request } from "express"

// Define the IUser interface for user data
export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

// Extend the Request interface to include user data
export interface AuthRequest extends Request {
  user?: IUser
}

// Define the types for login and registration requests
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}
