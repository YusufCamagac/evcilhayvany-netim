const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
  host: 'localhost', // Sadece localhost kullanın, örnek adını burada belirtmeyin
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Azure için gereklidir, lokalde de true kalabilir
      trustServerCertificate: true, // Geliştirme için, kendi sertifikanız yoksa
      instanceName: 'SQLEXPRESS' // Örnek adınızı buraya yazın
    },
    authentication: {
        type: 'default', // Varsayılan kimlik doğrulama türünü kullanır
    },
  },
  port: 1433, // SQL Server portunu belirtin
  logging: false, // SQL sorgularını konsolda görmek istemiyorsanız false yapın
  define: {
    timestamps: false // createdAt ve updatedAt sütunlarının otomatik olarak eklenmesini engellemek için
  }
});

module.exports = sequelize;