export default {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Schedules', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        eventId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Events',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        guestId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Guests',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        scheduleDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  
      await queryInterface.addIndex('Schedules', ['eventId']);
      await queryInterface.addIndex('Schedules', ['guestId']);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Schedules');
    },
  };