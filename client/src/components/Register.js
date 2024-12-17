import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Şifreler eşleşmiyor.');
      return;
    }

    // Örnek API isteği (gerçek uygulamanızda kendi API'nize göre değiştirin)
    try {
      // const response = await api.post('/register', formData); // API'nize istek atın
      // const data = response.data;

      // if (data.success) {
      //   navigate('/login'); // Kayıt başarılıysa giriş sayfasına yönlendir
      // } else {
      //   setMessage(data.message); // API'den gelen hata mesajını göster
      // }
      
      // **DEMO Amaçlı Yönlendirme**
      navigate('/login');
      alert("Kayıt işlemi, backend tarafında giriş kodları yazılmadığı için demo amaçlı yönlendirme yapılmıştır.");
    } catch (error) {
      console.error('Kayıt hatası:', error);
      setMessage('Kayıt olurken bir hata oluştu.');
    }
  };

  return (
    <div className="bg-secondary-900 min-h-screen flex items-center justify-center">
      <div className="bg-secondary-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary-500 mb-6">
          Kayıt Ol
        </h2>
        {message && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={formData.username}
              onChange={handleChange}
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
              htmlFor="email"
              className="block mb-2 text-secondary-300"
            >
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="E-posta adresinizi girin"
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
              value={formData.password}
              onChange={handleChange}
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-secondary-300"
            >
              Şifre Tekrar
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              placeholder="Şifrenizi tekrar girin"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;