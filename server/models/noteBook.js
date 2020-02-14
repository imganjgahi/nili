const Sequelize = require('sequelize');
const sequelize = require('../db/mysqlDatabase');
const Notebook = sequelize.define('notebook', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: "avatar.jpg"
    }

});

module.exports = Notebook;