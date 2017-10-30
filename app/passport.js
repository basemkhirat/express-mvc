var passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

/* Passport configurations */

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, function (err, user) {
        done(err, user);
    });
});

/**
 *  Passport strategies
 *  Here you can define more authentication strategies
 */

// Local authentication

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (error, user) {
            if (error) return done(error);
            if (!user) return done("Incorrect username", false);
            user.verifyPassword(password, function (error, valid) {
                if (error) return done(error, false);
                if (!valid) return done("Incorrect password", false);
                return done(null, user);
            });
        });
    }
));


// JWT authentication

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var options = {};

options.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");
options.secretOrKey = _config("jwt.secret");

passport.use(new JwtStrategy(options, function (payload, done) {

    User.findOne({id: payload.id}, function (error, user) {

        if (error) return done(error, false);
        if (!user) done(null, false);

        done(null, user);
    });
}));

