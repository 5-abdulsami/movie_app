import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import MovieDetailPage from './components/MovieDetailPage'
import FavoritesPage from './components/FavoritesPage'
import ProfilePage from './components/ProfilePage';
import AppDrawer from './components/AppDrawer'

import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_DASHBOARD,
  PATH_HOME,
  PATH_MOVIE_DETAIL,
  PATH_FAVORITES,
  PATH_PROFILE
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
            {/* NEW ROUTE FOR MOVIE DETAIL PAGE */}
          <Route path={PATH_MOVIE_DETAIL} element={<ProtectedRoute><MovieDetailPage /></ProtectedRoute>} />
            <Route
              path={PATH_DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path={PATH_DASHBOARD} element={<Dashboard />} />
              <Route path={PATH_FAVORITES} element={<FavoritesPage />} />
              <Route path={PATH_PROFILE} element={<ProfilePage />} />
              <Route path={PATH_MOVIE_DETAIL} element={<MovieDetailPage />} />
            </Route>
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