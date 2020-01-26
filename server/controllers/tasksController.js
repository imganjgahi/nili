let db = require('../db/database');

exports.getAllTasks = (req, res) => {
    return res.json({msg: "getAllTasks"})
};
exports.getTasksById = (req, res) => {
    return res.json({msg: "getTasksById: "+ req.params.id})
};
exports.createTasks = (req, res) => {
    return res.json({msg: "createTasks: ", data: req.body})
};
exports.updateTasks = (req, res) => {
    return res.json({msg: "updateTasks: " + req.params.id, data: req.body })
};
exports.deleteTasks = (req, res) => {
    return res.json({msg: "deleteTasks" + req.params.id})
};