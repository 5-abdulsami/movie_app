"use client"

import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { PATH_LOGIN } from "../constants/appConstants"

interface ProtectedRouteProps {
  children: React.ReactNode
}


 // ProtectedRoute component to guard routes that require authentication.
 // If the user is not authenticated, they will be redirected to the login page.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={PATH_LOGIN} state={{ from: location }} replace />
  }

  // If the user is authenticated, render the children components
  return <>{children}</>
}

export default ProtectedRoute