const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let db = require('../db/database')


exports.userTest = (req, res) => res.json({ msg: "users routes was worked" });


exports.userRegister = (req, res) => {
    var errors = {}
    if (!req.body.password) {
        errors.password = "No password specified";
    }
    if (!req.body.email) {
        errors.email = "No email specified";
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        name: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    }
    db.get(`SELECT * FROM users WHERE email = ?`, [req.body.email], (err, user) => {
        if (err) {
            return res.json({ msg: err.message })
        }
        if (user) {
            errors.email = 'this email is already exist';
            return res.status(400).json(errors)
        }
        bcrypt.hash(data.password, bcrypt.genSaltSync(10), (err, hash) => {
            if (err) {
                return res.json({ msg: err.message })
            };
            data.password = hash;
            var sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)'
            var params = [data.name, data.email, data.password]
            db.run(sql, params, function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "id": this.lastID
                })
            });
        });

    });

}

exports.userLogin = (req, res) => {
    const errors = {};
    const email = req.body.email;
    const password = req.body.password;


    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) {
            return res.json({ msg: err.message })
        }
        if (!user) {
            errors.email = 'user not found';
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {

                    const payLoad = { id: user.id, name: user.name, } //jwt payload

                    jwt.sign(payLoad, "THESECRETKEYS", { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                } else {
                    errors.password = 'password was incorrect';
                    res.status(400).json(errors);
                }
            }) 
    });
}