const Sequelize = require('sequelize');
const sequelize = require('../db/mysqlDatabase');
const Category = sequelize.define('category', {
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
    description: {
        type: Sequelize.STRING,
        defaultValue: "بدون توضیحات"
    },
    status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    },
    previewImage: {
        type: Sequelize.STRING,
        defaultValue: "category.jpg"
    }

})
module.exports = Category;