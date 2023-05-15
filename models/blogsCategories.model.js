const { DataTypes } = require("sequelize");

const db = require("../config/db");


module.exports = db.define("blogsCategories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true
  });


