const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: "localhost",
    dialect: "mysql",
    username: "root",
    database: "180blogs",
    logging : console.log ,
});

module.exports = sequelize;