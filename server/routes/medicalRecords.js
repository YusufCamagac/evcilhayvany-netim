const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');
const Pet = require('../models/Pet');

// Tüm tıbbi kayıtları getir (GET /api/medical-records)
router.get('/', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.findAll({
      include: [{ model: Pet, attributes: ['name'] }],
    });
    res.json(medicalRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Yeni bir tıbbi kayıt oluştur (POST /api/medical-records)
router.post('/', async (req, res) => {
  const { petId, recordDate, description } = req.body;

  try {
    const newMedicalRecord = await MedicalRecord.create({
      petId,
      recordDate,
      description,
    });

    res.json(newMedicalRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Belirli bir tıbbi kaydı getir (GET /api/medical-records/:id)
router.get('/:id', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({ msg: 'Tıbbi kayıt bulunamadı' });
    }
    res.json(medicalRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Tıbbi kaydı güncelle (PUT /api/medical-records/:id)
router.put('/:id', async (req, res) => {
  const { petId, recordDate, description } = req.body;

  try {
    let medicalRecord = await MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({ msg: 'Tıbbi kayıt bulunamadı' });
    }

    medicalRecord.petId = petId;
    medicalRecord.recordDate = recordDate;
    medicalRecord.description = description;

    await medicalRecord.save();

    res.json(medicalRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Tıbbi kaydı sil (DELETE /api/medical-records/:id)
router.delete('/:id', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({ msg: 'Tıbbi kayıt bulunamadı' });
    }

    await medicalRecord.destroy();

    res.json({ msg: 'Tıbbi kayıt silindi' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;