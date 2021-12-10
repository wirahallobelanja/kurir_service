'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Markers.init({
    lat: DataTypes.DECIMAL(10,8),
    lng: DataTypes.DECIMAL(11,8),
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Markers',
  });
  return Markers;
};