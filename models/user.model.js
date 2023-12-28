const { DataTypes } = require('sequelize');
const { sequelize } = require('../databaseCon/sequilize'); // Adjust the path

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Set the unique constraint for the email column
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'customer',
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true, // Set the unique constraint for the mobile column
  },
  isdeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  modifiedBy: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isSignIn: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
