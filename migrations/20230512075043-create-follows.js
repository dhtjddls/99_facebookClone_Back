"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable('Follows', {
=======
    await queryInterface.createTable("follows", {
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
      follow_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
<<<<<<< HEAD
        reference: {
          model: "Users",
=======
        references: {
          model: "users",
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      follower_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.dropTable('Follows');
  }
};
=======
    await queryInterface.dropTable("follows");
  },
};
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
