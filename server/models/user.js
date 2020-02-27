const Sequelize = require('sequelize');
const sequelize = require('../db/mysqlDatabase');
const Product = require("./product");
const Category = require("./category");
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: "avatar.jpg"
    }

})

User.hasMany(Product,{as: 'products', foreignKey: 'userId'});
Product.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Category,{as: 'categories', foreignKey: 'userId'});
Category.belongsTo(User, {foreignKey: 'userId'});

Category.hasMany(Product,{as: 'products', foreignKey: 'categoryId'});
Product.belongsTo(Category, {foreignKey: 'categoryId'});
module.exports = User;