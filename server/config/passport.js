const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let db = require('../db/database')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "THESECRETKEYS";

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        db.get("SELECT * FROM users WHERE id = ?",[jwt_payload.id], (err, user)=>{
            if(err){
                console.log(err.message)
                return
            }
            console.log(user)
            if(user) {
                return done(null, user);
            }
            return done(null, false);
        })
        // User.findById(jwt_payload.id)
        //     .then(user =>{
        //         if(user) {
        //             return done(null, user);
        //         }
        //         return done(null, false);
        //     }) .catch (err => console.log(err));
    }));
}