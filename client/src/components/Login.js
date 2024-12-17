import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !password) {
      setMessage('Kullanıcı adı ve şifre alanları zorunludur!');
      return;
    }

    // Simüle edilmiş backend isteği
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      const from = location.state?.from?.pathname || '/';
      navigate(from); // Önceki sayfaya yönlendir
    } else {
      setMessage('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="bg-secondary-900 p-4 min-h-screen flex justify-center items-center">
      <div className="bg-secondary-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-primary-500">Giriş Yap</h2>
        {message && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-secondary-300"
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                px-3
                py-2
                border
                rounded-md
                bg-secondary-700
                text-secondary-300
                placeholder-secondary-400
                focus:outline-none
                focus:ring-2
                focus:ring-primary-500
              "
              required
              placeholder="Kullanıcı adınızı girin"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-secondary-300"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-3
                py-2
                border
                rounded-md
                bg-secondary-700
                text-secondary-300
                placeholder-secondary-400
                focus:outline-none
                focus:ring-2
                focus:ring-primary-500
              "
              required
              placeholder="Şifrenizi girin"
            />
          </div>
          <button
            type="submit"
            className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;