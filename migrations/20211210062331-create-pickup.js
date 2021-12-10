'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pickups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      namaPenerima:{
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      lat1: {
        type: Sequelize.DECIMAL
      },
      lng1: {
        type: Sequelize.DECIMAL
      },
      lat2: {
        type: Sequelize.DECIMAL
      },
      lng2: {
        type: Sequelize.DECIMAL
      },
      namaDriver:{
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pickups');
  }
};