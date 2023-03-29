'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    static associate(models) {
      Contacts.belongsTo (models.User, {
        foreignKey: {name: 'user_id', allowNull: true},
      });

      Contacts.hasMany (models.Phones, {
        foreignKey: {name: 'contact_id', allowNull: true},
      });

      Contacts.hasOne (models.ContactsGroups, {
        foreignKey: {name: 'contact_id', allowNull: true},
      });
    }
  }
  Contacts.init({
    unique_id: DataTypes.STRING,
    name: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contacts',
  });
  return Contacts;
};