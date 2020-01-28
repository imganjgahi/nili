const TaskModel = require("../models/task")

exports.getAllTasks = (req, res, next) => {
    TaskModel.findAll({ where: { userId: req.user.id, status: 1 } }).then(data => {
        return res.json({ data })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.getTasksById = (req, res, next) => {
    TaskModel.findOne({ where: { userId: req.user.id, status: 1, id: req.params.id } }).then(task => {
        return res.json({ task })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.createTasks = (req, res, next) => {
    const data = req.body;
    TaskModel.create({
        title: data.title,
        description: data.description,
        category: data.category,
        status: 1,
        avatar: "TaskModel.jpg",
        userId: req.user.id,
        noteBookId: data.noteBookId,
    }).then(() => {
        return res.json({ message: "TaskModel Added" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.updateTasks = (req, res, next) => {

    const data = req.body

    TaskModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(task => {

        if (!task) {
            return res.status(400).json({ message: "Task not found" })
        }
        task.title = data.title;
        task.description= data.description,
        task.category= data.category,
        task.status = data.status;
        task.avatar = data.avatar;
        task.userId= req.user.id,
        task.noteBookId= data.noteBookId,
        task.save();
        return res.status(200).json({ message: "Task was updated" })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
exports.deleteTasks = (req, res, next) => {

    TaskModel.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(task => {

        if (!task) {
            return res.status(400).json({ message: "Task not found" })
        }
        task.destroy().then(() => {
            return res.status(200).json({ message: "Task was Deleted" })
        })
    }).catch(err => {
        console.log(err.message)
        next(err)
    });
};
