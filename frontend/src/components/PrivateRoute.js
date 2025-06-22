import React from 'react';
import { Navigate } from 'react-router-dom';

// 🔐 This component wraps protected routes and redirects if user is not logged in
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // If token exists, allow access; otherwise redirect to login
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
