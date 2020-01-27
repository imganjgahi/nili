const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let db = require('../db/mysqlDatabase');


exports.userRegister = (req, res) => {
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
    var data = {
        name: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    }


    db.execute(`SELEC * FROM users WHERE email = ?`, [req.body.email]).then(users => {
        const user = users[0][0]
        if (user) {
            errors.message = 'this email is already exist';
            return res.status(400).json(errors)
        }
        bcrypt.hash(data.password, bcrypt.genSaltSync(10), (err, hash) => {
            if (err) {
                return res.json({ msg: err.message })
            };
            data.password = hash;
            db.execute('INSERT INTO users (name, email, password) VALUES (?,?,?)', [data.name, data.email, data.password]).then(() => {
                return res.json({message: "user Added"})
            }).catch(err => {
                console.log(err.message)
                return res.status(500).join({ message: "someting was wrong" })
            })
        });
    }).catch(err => {
        console.log(err.message)
        return res.status(500).join({ message: "someting was wrong" })
    });

}

exports.userLogin = (req, res) => {
    const errors = {};
    const email = req.body.email;
    const password = req.body.password;

    db.execute(`SELECT * FROM users WHERE email = ?`, [email]).then(users => {
        const user = users[0][0]
        if (!user) {
            errors.message = 'user not found';
            return res.status(500).json(errors);
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
                    errors.message = 'password was incorrect';
                    return res.status(400).json(errors);
                }
            }).catch(err => {
                console.log("Bcrypt: ", err.message)
                return res.status(500).join({ message: "someting was wrong" })
            })
    }).catch(err => {
        console.log(err.message)
        return res.status(500).join({ message: "someting was wrong" })
    })
}