import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assents/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-secondary-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-grow flex justify-center sm:justify-start">
          <Link to="/" className="text-lg font-bold">
            <img
              src={logo}
              alt="Evcil Hayvan Bakım Sistemi Logosu"
              className="h-16"
            />
          </Link>
        </div>

        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:block bg-secondary-800 px-4 py-2 rounded-lg sm:static absolute top-full w-full left-0`}
        >
          <ul className="sm:flex space-y-4 sm:space-y-0 sm:space-x-4">
            <li>
              <NavLink
                to="/pet-registration"
                className={({ isActive }) =>
                  isActive ? 'text-primary-500' : 'hover:text-primary-500'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Evcil Hayvan Kaydı
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointment-scheduling"
                className={({ isActive }) =>
                  isActive ? 'text-primary-500' : 'hover:text-primary-500'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Randevu Al
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/medical-records"
                className={({ isActive }) =>
                  isActive ? 'text-primary-500' : 'hover:text-primary-500'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Tıbbi Kayıtlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reminders"
                className={({ isActive }) =>
                  isActive ? 'text-primary-500' : 'hover:text-primary-500'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Hatırlatıcılar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user-management"
                className={({ isActive }) =>
                  isActive ? 'text-primary-500' : 'hover:text-primary-500'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Kullanıcı Yönetimi
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;