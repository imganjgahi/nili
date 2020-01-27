let db = require('../db/mysqlDatabase');

exports.getAllHandbooks = (req, res, next) => {
    db.execute("SELECT * FROM handbooks WHERE userId = ? AND status = ?", [req.user.id, 1]).then(data => {
        return res.json({ data: data[0] })
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.getHandbooksById = (req, res, next) => {
    db.execute("SELECT * FROM handbooks WHERE userId = ? AND status = ? AND id = ?", [req.user.id, 1, req.params.id])
    .then(data => {
        let handbook = null
        if (data[0][0]) {
            handbook = data[0][0]
        }
        return res.json({ message: "success", data: handbook })
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.createHandbooks = async (req, res, next) => {
    const data = req.body;
    db.execute('INSERT INTO handbooks (title, userId, status, avatar, created_at) VALUES (?,?,?,?,?)', 
    [data.title, req.user.id, data.status, data.avatar, new Date()])
    .then(() => {
        return res.json({message: "handbook Added"})
    }).catch(err => {
        console.log(err.message)
        next(err)
    })
};
exports.updateHandbooks = (req, res) => {
    return res.json({ msg: "updateHandbooks: " + req.params.id, data: req.body })
};
exports.deleteHandbooks = (req, res) => {
    return res.json({ msg: "deleteHandbooks" + req.params.id })
};