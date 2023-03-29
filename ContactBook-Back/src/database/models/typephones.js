'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypePhones extends Model {
    static associate(models) {
      TypePhones.hasMany(models.Phones, {
        foreignKey: {name: "type_id", allowNull: true},
      });
    }
  }
  TypePhones.init({
    unique_id: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypePhones',
  });
  return TypePhones;
};