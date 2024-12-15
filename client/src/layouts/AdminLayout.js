import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Yönetici başlığı veya kenar çubuğu eklenebilir */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      {/* Yönetici alt bilgisi eklenebilir */}
    </div>
  );
};

export default AdminLayout;