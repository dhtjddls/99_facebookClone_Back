"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
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
      this.belongsTo(models.users, {
        targetKey: "user_id",
        foreignKey: "user_id",
      });
    }
  }
  likes.init(
    {
      like_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        pe: DataTypes.INTEGER,
        reference: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        reference: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("now"),
      },
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
