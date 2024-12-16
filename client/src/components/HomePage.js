import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Evcil Hayvan Bakımı ve Sağlık Yönetim Sistemi
          </h1>
          <p className="text-lg mb-8">
            Evcil hayvanlarınızın sağlığını ve bakımını kolayca yönetin!
          </p>
          <Link
            to="/pet-registration"
            className="bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-blue-100"
          >
            Evcil Hayvanınızı Kaydedin
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Özellik kartları */}
            <div className="p-6 border rounded-lg shadow-md bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-500">
                Evcil Hayvan Kaydı
              </h3>
              <p className="text-secondary-300">
                Evcil hayvanlarınızın tüm bilgilerini tek bir yerde tutun.
              </p>
              <Link
                to="/pet-registration"
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-500">
                Randevu Zamanlama
              </h3>
              <p className="text-secondary-300">
                Veteriner ve tımarlayıcı randevularını kolayca alın.
              </p>
              <Link
                to="/appointment-scheduling"
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-500">
                Tıbbi Kayıtlar
              </h3>
              <p className="text-secondary-300">
                Evcil hayvanlarınızın tıbbi geçmişini takip edin ve yönetin.
              </p>
              <Link
                to="/medical-records"
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-500">
                Hatırlatıcılar
              </h3>
              <p className="text-secondary-300">
                Önemli ilaç ve aşıları asla unutmayın.
              </p>
              <Link
                to="/reminders"
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-500">
                Kullanıcı Yönetimi
              </h3>
              <p className="text-secondary-300">
                Profilinizi ve evcil hayvan bilgilerinizi yönetin.
              </p>
              <Link
                to="/user-management"
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-500">
                Yönetici Yönetimi
              </h3>
              <p className="text-secondary-300">
                Kullanıcıları, evcil hayvanları, randevuları ve tıbbi kayıtları
                yönetin.
              </p>
              <Link
                to="/admin"
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Panele Git
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;