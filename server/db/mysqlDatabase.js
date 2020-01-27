const Sequelize = require('sequelize');

const sequelize = new Sequelize("nili", "root", "rootPassword", {dialect: "mysql", host: "localhost"});

module.exports = sequelize;