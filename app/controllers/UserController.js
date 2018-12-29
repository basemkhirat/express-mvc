/**
 * UsersController
 * @description :: Server-side logic for managing users
 */

var jwt = require("jsonwebtoken");

module.exports = {

    /**
     * Find one user
     * @param req
     * @param res
     */
    findOne: function (req, res) {

        var id = req.param("id");

        User.findById(id, function (error, user) {
            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");

            return res.ok(user);
        });

    },

    /**
     * Find all users
     * @param req
     * @param res
     */
    find: function (req, res) {

        User.find(function (error, users) {
            if (error) return res.serverError(error);

            return res.ok(users);
        });

    },

    /**
     * Create a new user
     * @param req
     * @param res
     * @returns {*}
     */
    create: function (req, res) {

        var user = new User({
            username: req.param("username"),
            email: req.param("email"),
            password: req.param("password"),
            first_name: req.param("first_name"),
            last_name: req.param("last_name")
        });

        user.save(function (error, user) {

            if (error) return res.serverError(error);

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
    },

    /**
     * Update user by id
     * @param req
     * @param res
     */
    update: function (req, res) {

        var id = req.param("id");

        console.log(req.user);

        User.findById(id, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");

            if (req.param("username")) {
                user.username = req.param("username");
            }

            if (req.param("email")) {
                user.email = req.param("email");
            }

            if (req.param("first_name")) {
                user.first_name = req.param("first_name")
            }

            if (req.param("last_name")) {
                user.last_name = req.param("last_name");
            }

            if (req.param("password")) {
                user.password = req.param("password");
            }

            user.save(function (error, user) {
                if (error) return res.serverError(error);

                return res.ok(user);
            });
        });
    },

    /**
     * Delete user by id
     * @param req
     * @param res
     */
    destroy: function (req, res) {

        var id = req.param("id");

        User.findById(id, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");

            user.remove(function (error, user) {
                if (error) return res.serverError(error);

                return res.ok(user);
            });
        });
    }
};

