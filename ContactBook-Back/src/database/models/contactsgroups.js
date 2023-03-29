'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactsGroups extends Model {
    static associate(models) {
      ContactsGroups.belongsToMany(models.Contacts, {
        foreignKey: { name: 'contact_id', allowNull: true },
        through: 'contacts'
      });
      
      ContactsGroups.belongsToMany(models.Groups, {
        foreignKey: { name: 'group_id', allowNull: true },
        through: 'groups'
      });
    }
  }
  ContactsGroups.init({
    contact_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ContactsGroups',
  });
  return ContactsGroups;
};