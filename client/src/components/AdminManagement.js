import React from 'react';
import { Link } from 'react-router-dom';

const AdminManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Yönetici Paneli</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/users" className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 block text-center">
          Kullanıcıları Yönet
        </Link>
        <Link to="/admin/pets" className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 block text-center">
          Evcil Hayvanları Yönet
        </Link>
        <Link to="/admin/appointments" className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 block text-center">
          Randevuları Yönet
        </Link>
        <Link to="/admin/medical-records" className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 block text-center">
          Tıbbi Kayıtları Yönet
        </Link>
      </div>
    </div>
  );
};

export default AdminManagement;