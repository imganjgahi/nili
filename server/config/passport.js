const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require("../models/user")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "THESECRETKEYS";

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        UserModel.findOne({ id: jwt_payload.id }).then((user) => {

            if (user) {
                return done(null, user);
            }
            return done(null, false);

        }).catch(err => {
            console.log(err.message)
            return
        })
    }));
}