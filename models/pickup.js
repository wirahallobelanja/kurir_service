'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pickup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pickup.init({
    name: DataTypes.STRING,
    namaPenerima:DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    address: DataTypes.STRING,
    lat1: DataTypes.DECIMAL,
    lng2: DataTypes.DECIMAL,
    lat2: DataTypes.DECIMAL,
    lng2: DataTypes.DECIMAL,
    namaDriver: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pickup',
  });
  return Pickup;
};