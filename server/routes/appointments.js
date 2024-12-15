const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');

// Tüm randevuları getir (GET /api/appointments)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
        include: [{ model: Pet, attributes: ['name'] }], // Evcil hayvanın adını da getir
    });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Yeni bir randevu oluştur (POST /api/appointments)
router.post('/', async (req, res) => {
  const { petId, date, time, provider, reason } = req.body;

  try {
    const newAppointment = await Appointment.create({
      petId,
      date,
      time,
      provider,
      reason,
    });

    res.json(newAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Belirli bir randevuyu getir (GET /api/appointments/:id)
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Randevu bulunamadı' });
    }
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Randevuyu güncelle (PUT /api/appointments/:id)
router.put('/:id', async (req, res) => {
  const { petId, date, time, provider, reason } = req.body;

  try {
    let appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Randevu bulunamadı' });
    }

    appointment.petId = petId;
    appointment.date = date;
    appointment.time = time;
    appointment.provider = provider;
    appointment.reason = reason;

    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Randevuyu sil (DELETE /api/appointments/:id)
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Randevu bulunamadı' });
    }

    await appointment.destroy();

    res.json({ msg: 'Randevu silindi' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;