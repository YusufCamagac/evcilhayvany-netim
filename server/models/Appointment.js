const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Pet = require('./Pet');

const Appointment = db.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
  },
  reason: {
    type: DataTypes.STRING,
  },
});

Appointment.belongsTo(Pet, { foreignKey: 'petId' });

module.exports = Appointment;