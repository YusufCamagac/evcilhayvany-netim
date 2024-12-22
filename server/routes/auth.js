const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Kullanıcı Kaydı (POST /api/auth/register)
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Kullanıcı adı veya e-posta zaten var mı kontrol et
    let user = await User.findOne({ where: { username } });
    if (user) {
      return res
        .status(400)
        .json({ msg: "Bu kullanıcı adı zaten kullanılıyor." });
    }

    user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ msg: "Bu e-posta adresi zaten kullanılıyor." });
    }

    // Yeni kullanıcı oluştur
    user = await User.create({
      username,
      email,
      password, // Şifre User modelinde otomatik olarak hash'lenecek
      role,
    });

    // JWT oluştur
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // Token süresini ayarla
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu Hatası");
  }
});

// Kullanıcı Girişi (POST /api/auth/login)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanında ara
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ msg: "Geçersiz kullanıcı adı veya şifre" });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Geçersiz kullanıcı adı veya şifre" });
    }

    // JWT oluştur
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu Hatası");
  }
});

module.exports = router;