'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {
    static associate(models) {
      Phones.belongsTo (models.Contacts, {
        foreignKey: {name: 'contact_id', allowNull: true},
      });
      Phones.belongsTo (models.TypePhones, {
        foreignKey: {name: 'type_id', allowNull: true},
      });
    }
  }
  Phones.init({
    unique_id: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    value: DataTypes.STRING,
    contact_id: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Phones',
  });
  return Phones;
};