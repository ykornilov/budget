'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Operations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            amount: {
                allowNull: false,
                type: Sequelize.DECIMAL,
            },
            accountId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Accounts', key: 'id' },
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Categories', key: 'id' },
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'id' },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Operations');
    },
};
