const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Pet = require('./Pet');

const MedicalRecord = db.define('MedicalRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recordDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

MedicalRecord.belongsTo(Pet, { foreignKey: 'petId' });

module.exports = MedicalRecord;