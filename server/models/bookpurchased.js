'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookpurchased extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bookpurchased.init({
    idTransaction: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookpurchased',
  });
  return Bookpurchased;
};