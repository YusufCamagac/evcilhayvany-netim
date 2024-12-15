import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assents/logo.png';

const Header = () => {
  return (
    <header className="bg-secondary-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Ortalanmış */}
        <div className="flex-grow flex justify-center">
            <Link to="/" className="text-lg font-bold">
            <img src={logo} alt="Evcil Hayvan Bakım Sistemi Logosu" className="h-16" />
            </Link>
        </div>
        

        {/* Menü Sağa Hizalanmış ve Daha Belirgin */}
        <nav className="bg-secondary-800 px-4 py-2 rounded-lg">
          <ul className="flex space-x-4">
            <li>
              <Link to="/pet-registration" className="hover:text-primary-500">
                Evcil Hayvan Kaydı
              </Link>
            </li>
            <li>
              <Link to="/appointment-scheduling" className="hover:text-primary-500">
                Randevu Al
              </Link>
            </li>
            <li>
              <Link to="/medical-records" className="hover:text-primary-500">
                Tıbbi Kayıtlar
              </Link>
            </li>
            <li>
              <Link to="/reminders" className="hover:text-primary-500">
                Hatırlatıcılar
              </Link>
            </li>
            <li>
              <Link to="/user-management" className="hover:text-primary-500">
                Kullanıcı Yönetimi
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;