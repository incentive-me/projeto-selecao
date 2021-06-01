'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repositories', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      repoId: {
        type:Sequelize.STRING,
        allowNull:false,
      },
      tag: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
      }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repositories');
  }
};
