'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Contacts, {
        foreignKey: {name: "user_id", allowNull: true},
      });

      User.hasMany(models.Groups, {
        foreignKey: {name: "user_id", allowNull: true},
      });
    }
  }
  User.init({
    unique_id: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};