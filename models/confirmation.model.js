// models/user.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../databaseCon/sequilize');

const User = sequelize.define('UserConfirmation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'UserConfirmation',
  timestamps: false,
});

module.exports = User;
