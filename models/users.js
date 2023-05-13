"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.posts, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      is.hasMany(models.follows, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.comments, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.likes, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
    }
  }
  users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profile_url: {
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
      modelName: "users",
    }
  );
  return users;
};
