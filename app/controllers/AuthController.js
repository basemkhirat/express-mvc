var jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Request a new api token
     * @param req
     * @param res
     * @returns {*}
     */
    token: function (req, res) {

        var email = req.param("email");
        var password = req.param("password");

        if (!email || !password) return res.badRequest('Email and password required');

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.badRequest('Invalid email');

            user.comparePassword(password, function (error, valid) {

                if (error) return res.forbidden('Forbidden');
                if (!valid) return res.badRequest('Invalid password');

                return res.ok({
                    user: user,
                    token: jwt.sign(
                        user.toJSON(),
                        _config("jwt.secret"),
                        {expiresIn: _config("jwt.expires")}
                    ),
                    expires: _config("jwt.expires")
                });
            });
        })
    },

    /**
     * Login user
     * @param req
     * @param res
     * @returns {*}
     */
    login: function (req, res) {

        var email = req.param("email");
        var password = req.param("password");

        if (!email || !password) return res.badRequest('Email and password required');

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.badRequest('Invalid email');

            user.comparePassword(password, function (error, valid) {

                if (error) return res.forbidden('Forbidden');
                if (!valid) return res.badRequest('Invalid password');

                req.login(user, function (error) {
                    if (error) return next(error);
                    return res.redirect("/profile");
                });
            });
        })
    },

    /**
     * Logout the current user
     * @param req
     * @param res
     * @returns {*}
     */
    logout: function (req, res) {
        req.logout();
        return res.back();
    }
};

