import type React from "react"
import { useAuth } from "../context/AuthContext"

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your Dashboard!</h2>
              <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile Information</h3>
                <div className="space-y-2 text-left">
                  <p>
                    <span className="font-medium text-gray-700">Name:</span>{" "}
                    <span className="text-gray-900">{user?.name}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    <span className="text-gray-900">{user?.email}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">User ID:</span>{" "}
                    <span className="text-gray-900 font-mono text-sm">{user?.id}</span>
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-gray-600">
                  🎉 Congratulations! You have successfully implemented JWT authentication with a MERN stack
                  application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
