require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Rotalar
const petRoutes = require('./routes/pets');
const appointmentRoutes = require('./routes/appointments');
const medicalRecordRoutes = require('./routes/medicalRecords');
const userRoutes = require('./routes/users');
const reminderRoutes = require('./routes/reminders');
const authRoutes = require('./routes/auth');

const app = express();

// Veritabanı Bağlantısı
db.authenticate()
  .then(() => console.log('Veritabanı bağlandı...'))
  .catch(err => console.log('Hata: ' + err));


app.use(cors());

app.use(express.json());


app.use('/api/pets', petRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/auth', authRoutes);


if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET tanımlanmamış!');
  process.exit(1); // Uygulamadan çık
}

// Modellerin Senkronize Edilmesi (Tabloları oluşturur)
db.sync({ force: false })
  .then(() => {
    console.log('Modeller senkronize edildi.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Sunucu ${PORT} bağlantı noktasında çalışıyor`));
  })
  .catch(err => console.log('Modeller senkronize edilemedi: ' + err));