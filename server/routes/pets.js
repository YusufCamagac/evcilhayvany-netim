const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// Tüm evcil hayvanları getir (GET /api/pets)
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Yeni bir evcil hayvan oluştur (POST /api/pets)
router.post('/', async (req, res) => {
  const { name, species, breed, age, gender, medicalHistory } = req.body;

  try {
    const newPet = await Pet.create({
      name,
      species,
      breed,
      age,
      gender,
      medicalHistory,
    });

    res.json(newPet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Belirli bir evcil hayvanı getir (GET /api/pets/:id)
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ msg: 'Evcil hayvan bulunamadı' });
    }
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Evcil hayvanı güncelle (PUT /api/api/pets/:id)
router.put('/:id', async (req, res) => {
  const { name, species, breed, age, gender, medicalHistory } = req.body;

  try {
    let pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ msg: 'Evcil hayvan bulunamadı' });
    }

    pet.name = name;
    pet.species = species;
    pet.breed = breed;
    pet.age = age;
    pet.gender = gender;
    pet.medicalHistory = medicalHistory;

    await pet.save();

    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Evcil hayvanı sil (DELETE /api/pets/:id)
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ msg: 'Evcil hayvan bulunamadı' });
    }

    await pet.destroy();

    res.json({ msg: 'Evcil hayvan silindi' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;