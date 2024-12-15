const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Pet = require('./Pet');

const Reminder = db.define('Reminder', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // İlaç, Aşı, Randevu vb.
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

// İlişki
Reminder.belongsTo(Pet, { foreignKey: 'petId' });

module.exports = Reminder;