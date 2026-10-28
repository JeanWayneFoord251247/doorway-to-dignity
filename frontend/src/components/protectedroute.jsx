import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  const userRole = localStorage.getItem('userRole') || localStorage.getItem('role');

  if (!token || !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to='/volunteer' replace />;
  }

  return children;
};

export default ProtectedRoute;