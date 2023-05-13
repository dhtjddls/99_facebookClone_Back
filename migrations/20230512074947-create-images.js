"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable('Images', {
=======
    await queryInterface.createTable("images", {
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      img_url: {
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
    await queryInterface.dropTable('Images');
  }
};
=======
    await queryInterface.dropTable("images");
  },
};
>>>>>>> b87f588923c6388727d5764de2975e6083562b8d
