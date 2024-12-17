// client/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Kullanıcı giriş yapmamışsa Login sayfasına yönlendir
    return <Navigate to="/login" replace />;
  }

  return children; // Giriş yapmışsa, istediği sayfayı göster
};

export default PrivateRoute;