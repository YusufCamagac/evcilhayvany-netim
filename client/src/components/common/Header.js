import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assents/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-secondary-900 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex-grow flex justify-center sm:justify-start mb-4 sm:mb-0">
          <Link to="/" className="text-lg font-bold">
            <img
              src={logo}
              alt="Evcil Hayvan Bakım Sistemi Logosu"
              className="h-16"
            />
          </Link>
        </div>

        {/* Hamburger Menü Simgesi (Mobil) */}
        <button className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

        <div
          className={`flex flex-col sm:flex-row w-full sm:w-auto ${
            isMenuOpen ? '' : 'hidden sm:flex'
          } mt-4 sm:mt-0`}
        >
          {/* Menü (Desktop ve Mobil) */}
          <nav
            className={`bg-secondary-800 px-4 py-2 rounded-lg ${
              isMenuOpen ? 'w-full' : ''
            }`}
          >
            <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
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
              {isLoggedIn && (
                <>
                  <li>
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        isActive ? 'text-primary-500' : 'hover:text-primary-500'
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Yönetici Paneli
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
                </>
              )}
              <li className="ml-0 sm:ml-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="hover:text-primary-500"
                  >
                    Çıkış Yap
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                )}
              </li>
              {!isLoggedIn && (
                <li>
                  <Link
                    to="/user-management"
                    className="hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;