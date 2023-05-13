"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable('Comments', {
=======
    await queryInterface.createTable("comments", {
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
      comment_id: {
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
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
<<<<<<< HEAD
        reference: {
          model: "Posts",
=======
        references: {
          model: "posts",
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      comment: {
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
    await queryInterface.dropTable('Comments');
  }
};
=======
    await queryInterface.dropTable("comments");
  },
};
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
