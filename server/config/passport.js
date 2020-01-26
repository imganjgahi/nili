const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let db = require('../db/mysqlDatabase')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "THESECRETKEYS";

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        db.execute(`SELECT * FROM users WHERE id = ?`, [jwt_payload.id]).then(users=> {
            const user = users[0][0]
            if(user) {
                return done(null, user);
            }
            return done(null, false);

        }).catch(err => {
            console.log(err.message)
            return
        })
    }));
}