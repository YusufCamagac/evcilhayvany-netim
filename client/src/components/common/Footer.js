import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-secondary-400 p-6 mt-12">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} Evcil Hayvan Bakım Sistemi</p>
        <div className="mt-2">
          <a href="/gizlilik-politikasi" className="hover:text-primary-500 mr-4">
            Gizlilik Politikası
          </a>
          <a href="/kullanim-kosullari" className="hover:text-primary-500">
            Kullanım Koşulları
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;