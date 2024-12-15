import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-secondary-300 p-4 mt-8">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} Evcil Hayvan Bakım Sistemi
      </div>
    </footer>
  );
};

export default Footer;