const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Tüm kullanıcıları getir (GET /api/users) - Sadece admin görebilmeli
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Şifreyi gösterme
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Yeni bir kullanıcı oluştur (POST /api/users)
router.post('/', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Belirli bir kullanıcıyı getir (GET /api/users/:id)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Kullanıcıyı güncelle (PUT /api/users/:id)
router.put('/:id', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    let user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
    }

    user.username = username;
    user.email = email;
    user.role = role;

    // Eğer şifre güncellendiyse, şifrele
    if (password) {
      user.password = password;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// Kullanıcıyı sil (DELETE /api/users/:id)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
    }

    await user.destroy();

    res.json({ msg: 'Kullanıcı silindi' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;