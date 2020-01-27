let db = require('../db/mysqlDatabase');

exports.getAllTasks = (req, res, next) => {
    db.execute("SELECT * FROM tasks WHERE userId = ? AND status = ?", [req.user.id, 1]).then(data => {
        return res.json({ data: data[0] })
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.getTasksById = (req, res, next) => {
    db.execute("SELECT * FROM tasks WHERE userId = ? AND status = ? AND id = ?", [req.user.id, 1, req.params.id])
    .then(data => {
        let task = null
        if (data[0][0]) {
            task = data[0][0]
        }
        return res.json({ message: "success", data: task })
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.createTasks = (req, res, next) => {
    const data = req.body;
    db.execute('INSERT INTO tasks (title, description, status, handbookId, userId, created_at) VALUES (?,?,?,?,?,?)', 
    [data.title, data.description, data.status, data.handbookId, req.user.id, new Date()])
    .then(() => {
        return res.json({message: "createTasks Success"})
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.updateTasks = (req, res, next) => {
    const data = req.body

    db.execute("UPDATE tasks SET title = ?, description= ?, status = ?, handbookId = ?, userId = ?, updated_at = ? WHERE id = ? AND userId = ?", [
        data.title,
        data.description,
        data.status,
        data.handbookId,
        req.user.id,
        new Date(),
        req.params.id,
        req.user.id
    ]).then(() => {
        return res.json({message: "Task Updated"})
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.deleteTasks = (req, res, next) => {
   db.execute("DELETE FROM tasks WHERE userId = ? AND id = ?", [req.user.id, req.params.id]).then(() => {
    return res.json({message: "Task Deleted"})
}).catch(err => {
    console.log(err.message)
    next(err)
})
};
