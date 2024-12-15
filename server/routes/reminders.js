const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const Pet = require('../models/Pet');

// Tüm hatırlatıcıları getir (GET /api/reminders)
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      include: [{ model: Pet, attributes: ['name'] }], // Evcil hayvanın adını da getir
    });
    res.json(reminders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Yeni hatırlatıcı oluştur (POST /api/reminders)
router.post('/', async (req, res) => {
  const { petId, type, date, notes } = req.body;

  try {
    const newReminder = await Reminder.create({
      petId,
      type,
      date,
      notes,
    });

    res.json(newReminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Belirli bir hatırlatıcıyı getir (GET /api/reminders/:id)
router.get('/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findByPk(req.params.id);
    if (!reminder) {
      return res.status(404).json({ msg: 'Hatırlatıcı bulunamadı' });
    }
    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Hatırlatıcıyı güncelle (PUT /api/reminders/:id)
router.put('/:id', async (req, res) => {
  const { petId, type, date, notes } = req.body;

  try {
    let reminder = await Reminder.findByPk(req.params.id);
    if (!reminder) {
      return res.status(404).json({ msg: 'Hatırlatıcı bulunamadı' });
    }

    reminder.petId = petId;
    reminder.type = type;
    reminder.date = date;
    reminder.notes = notes;

    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Hatırlatıcıyı sil (DELETE /api/reminders/:id)
router.delete('/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findByPk(req.params.id);
    if (!reminder) {
      return res.status(404).json({ msg: 'Hatırlatıcı bulunamadı' });
    }

    await reminder.destroy();

    res.json({ msg: 'Hatırlatıcı silindi' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;