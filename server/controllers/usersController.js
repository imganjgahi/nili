const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user")
const NoteBookModel = require("../models/noteBook")
const TaskModel = require("../models/task")



exports.userPanel = (req, res, next) => {
    UserModel.findOne({
        where: { id: req.user.id },
        attributes: ['name'],
        include: [
            { model: NoteBookModel, as: "notebooks", 
            attributes: ['id', 'title'],
            where: {status: 1},
            order: [
                ["id", "DESC"]
            ], limit: 5 },
            { model: TaskModel, as: "tasks", 
            attributes: ['id', 'title'],
            where: {status: 1},
            order: [
                ["id", "DESC"]
            ], limit: 5 },
        ]}).then(data => {
        return res.json(data)
    }).catch(err => {
        console.log(err);
        next(err)
    })
}
exports.userRegister = (req, res, next) => {
    var errors = {}
    if (!req.body.password) {
        errors.message = "No password specified";
    }
    if (!req.body.email) {
        errors.message = "No email specified";
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    const data = {
        name: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    }

    UserModel.findOne({ where: { email: data.email } }).then((user) => {
        if (user) {
            errors.message = 'this email is already exist';
            return res.status(400).json(errors)
        }
        bcrypt.hash(data.password, bcrypt.genSaltSync(10), (err, hash) => {
            if (err) {
                return res.json({ msg: err.message })
            };
            data.password = hash;
            UserModel.create({
                name: data.name,
                email: data.email,
                password: data.password,
                avatar: data.avatar
            }).then((result) => {
                return res.json({ message: "user Added" })
            }).catch(err => {
                console.log(err.message)
                next(err)
            })
        });

    }).catch(err => {
        console.log(err.message)
        next(err)
    });

}

exports.userLogin = (req, res, next) => {
    const errors = {};
    const email = req.body.email;
    const password = req.body.password;


    UserModel.findOne({ where: { email } }).then((user) => {
        if (!user) {
            errors.message = 'user not found';
            return res.status(500).json(errors);
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {

                    const payLoad = { id: user.id, name: user.name, } //jwt payload

                    jwt.sign(payLoad, "THESECRETKEYS", { expiresIn: 36000 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                } else {
                    errors.message = 'password was incorrect';
                    return res.status(400).json(errors);
                }
            }).catch(err => {
                console.log("Bcrypt: ", err.message)
                next(err)
            })

    }).catch(err => {
        console.log(err.message)
        next(err)
    });
}