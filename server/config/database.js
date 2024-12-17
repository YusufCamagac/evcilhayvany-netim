const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Azure kullanıyorsanız
      trustServerCertificate: true, // Geliştirme için, üretimde kendi sertifikanızı kullanın ya da 'false' yapın
    },
  },
});

module.exports = sequelize;