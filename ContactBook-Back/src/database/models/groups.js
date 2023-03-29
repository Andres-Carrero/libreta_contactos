'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    static associate(models) {
      Groups.belongsTo(models.User, {
        foreignKey: {name: 'user_id', allowNull: true},
      });

      Groups.belongsToMany (models.ContactsGroups, {
        foreignKey: {name: 'id', allowNull: true},
        through: 'groups'
      });
    }
  }
  Groups.init({
    unique_id: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Groups',
  });
  return Groups;
};