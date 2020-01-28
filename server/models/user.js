const Sequelize = require('sequelize');
const sequelize = require('../db/mysqlDatabase');
const Notebook = require("./noteBook");
const Task = require("./task");
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

User.hasMany(Notebook,{as: 'notebooks', foreignKey: 'userId'});
Notebook.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Task,{as: 'tasks', foreignKey: 'userId'});
Task.belongsTo(User, {foreignKey: 'userId'});
module.exports = User;