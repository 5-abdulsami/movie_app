import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import HomePage from "./components/HomePage"
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_DASHBOARD,
  PATH_HOME,
} from "./constants/appConstants" 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path={PATH_HOME} element={<HomePage />} />
            <Route path={PATH_LOGIN} element={<Login />} />
            <Route path={PATH_REGISTER} element={<Register />} />
            <Route
              path={PATH_DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Redirect root path to dashboard */}
            <Route path={PATH_HOME} element={<Navigate to={PATH_DASHBOARD} replace />} />
            {/* Catch-all route for unmatched paths, redirect to dashboard */}
            <Route path="*" element={<Navigate to={PATH_DASHBOARD} replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App