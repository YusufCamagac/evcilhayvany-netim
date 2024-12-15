import React from 'react';
import { Link } from 'react-router-dom';
import dogImage from '../assents/dog.jpg'; // Köpek resmi yolunu güncelleyin
import vetImage from '../assents/veteriner.jpg'; // Veteriner resmi yolunu güncelleyin

const HomePage = () => {
  return (
    <div className="bg-secondary-900">
      <section className="text-white py-20">
        <div className="container mx-auto text-center">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4 text-accent-300">Evcil Hayvan Bakım ve Sağlık Yönetim Sistemi</h1>
              <p className="text-lg mb-8 text-secondary-300">Evcil hayvanlarınızın sağlığını ve bakımını kolayca yönetin!</p>
              <Link to="/pet-registration" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-semibold">
                Evcil Hayvanınızı Kaydedin
              </Link>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src={dogImage} alt="Sevimli Köpek" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent-300">Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Özellik kartları */}
            <div className="p-6 border border-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">Evcil Hayvan Kaydı</h3>
              <p className="text-secondary-300">Evcil hayvanlarınızın tüm bilgilerini tek bir yerde tutun.</p>
              <Link to="/pet-registration" className="text-primary-400 mt-2 inline-block hover:underline">
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border border-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">Randevu Zamanlama</h3>
              <p className="text-secondary-300">Veteriner ve tımarlayıcı randevularını kolayca alın.</p>
              <Link to="/appointment-scheduling" className="text-primary-400 mt-2 inline-block hover:underline">
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border border-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">Tıbbi Kayıtlar</h3>
              <p className="text-secondary-300">Evcil hayvanlarınızın tıbbi geçmişini takip edin ve yönetin.</p>
              <Link to="/medical-records" className="text-primary-400 mt-2 inline-block hover:underline">
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border border-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">Hatırlatıcılar</h3>
              <p className="text-secondary-300">Önemli ilaç ve aşıları asla unutmayın.</p>
              <Link to="/reminders" className="text-primary-400 mt-2 inline-block hover:underline">
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border border-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">Kullanıcı Yönetimi</h3>
              <p className="text-secondary-300">Profilinizi ve evcil hayvan bilgilerinizi yönetin.</p>
              <Link to="/user-management" className="text-primary-400 mt-2 inline-block hover:underline">
                Daha Fazla Bilgi
              </Link>
            </div>
            <div className="p-6 border border-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-secondary-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">Yönetici Yönetimi</h3>
              <p className="text-secondary-300">Kullanıcıları, evcil hayvanları, randevuları ve tıbbi kayıtları yönetin.</p>
              <Link to="/admin" className="text-primary-400 mt-2 inline-block hover:underline">
                Panele Git
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-accent-300">Hakkımızda</h2>
                <p className="text-lg mb-8 text-secondary-300">Evcil hayvanlarınızın sağlığı ve mutluluğu bizim önceliğimizdir. Uzman veteriner hekimlerimiz ve deneyimli personelimizle, evcil dostlarınıza en iyi bakımı sunmak için buradayız.</p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src={vetImage} alt="Veteriner ve Evcil Hayvanlar" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;