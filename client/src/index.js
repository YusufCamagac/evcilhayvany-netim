import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS stillerini içe aktar
import AppRoutes from './routes'; // Rotaları içe aktar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);