import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Evcil Hayvan Bakım Sistemi
        </Link>
        <nav className="space-x-4">
          <Link to="/pet-registration" className="hover:text-primary-100">
            Evcil Hayvan Kaydı
          </Link>
          <Link to="/appointment-scheduling" className="hover:text-primary-100">
            Randevu Al
          </Link>
          <Link to="/medical-records" className="hover:text-primary-100">
            Tıbbi Kayıtlar
          </Link>
          <Link to="/reminders" className="hover:text-primary-100">
            Hatırlatıcılar
          </Link>
          <Link to="/user-management" className="hover:text-primary-100">
            Kullanıcı Yönetimi
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;