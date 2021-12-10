'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trip.init({
    name: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    lat1: DataTypes.DECIMAL,
    lng1: DataTypes.DECIMAL,
    lat2: DataTypes.DECIMAL,
    lng2: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};