"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable('Posts', {
=======
    await queryInterface.createTable("posts", {
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
      post_id: {
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
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      likes: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Posts');
  }
};
=======
    await queryInterface.dropTable("posts");
  },
};
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
