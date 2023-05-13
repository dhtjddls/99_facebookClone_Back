"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.posts, {
        targetKey: "post_id",
        foreignKey: "post_id",
      });
    }
  }
  images.init(
    {
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      img_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "images",
    }
  );
  return images;
};
