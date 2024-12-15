import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Evcil Hayvan Bakım Sistemi
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/pet-registration" className="hover:underline">
                Evcil Hayvan Kaydı
              </Link>
            </li>
            <li>
              <Link to="/appointment-scheduling" className="hover:underline">
                Randevu Al
              </Link>
            </li>
            <li>
              <Link to="/medical-records" className="hover:underline">
                Tıbbi Kayıtlar
              </Link>
            </li>
            <li>
              <Link to="/reminders" className="hover:underline">
                Hatırlatıcılar
              </Link>
            </li>
            <li>
              <Link to="/user-management" className="hover:underline">
                Kullanıcı Yönetimi
              </Link>
            </li>
            {/* Giriş/Çıkış bağlantıları eklenebilir */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;