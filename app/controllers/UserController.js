/**
 * UsersController
 * @description :: Server-side logic for managing users
 */

module.exports = {

    /**
     * Find one user
     * @param req
     * @param res
     */
    findOne: function (req, res) {

        const id = req.param("id");

        User.findOne({id: id}, function (error, user) {
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
     */
    create: function (req, res) {

        const user = {
            username: req.param("username"),
            email: req.param("email"),
            password: req.param("password"),
            first_name: req.param("first_name"),
            last_name: req.param("last_name")
        };

        User.create(user, function (error, user) {

            if (error) return res.serverError(error);

            return res.ok({
                user: user,
                token: Token.generate({id: user.id}),
                expires: new Date().getTime() + 3 * 60 * 60
            });

        });
    },

    /**
     * Update a given user
     * @param req
     * @param res
     */
    update: function (req, res) {

        const id = req.param("id");

        User.findOne({id: id}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");

            const data = {};

            if (req.param("username")) {
                data.username = req.param("username");
            }

            if (req.param("email")) {
                data.email = req.param("email");
            }

            if (req.param("first_name")) {
                data.first_name = req.param("first_name");
            }

            if (req.param("last_name")) {
                data.last_name = req.param("last_name");
            }

            if (req.param("password")) {
                data.password = req.param("password");
            }

            User.update({id: id}, data, function (error, user) {
                if (error) return res.serverError(error);
                return res.ok(user);
            });

        });

    },

    /**
     * Delete a given user
     * @param req
     * @param res
     */
    destroy: function (req, res) {

        const id = req.param("id");

        User.findOne({id: id}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");

            User.destroy({id: id}, function (error, user) {
                if (error) return res.serverError(error);
                return res.ok(user);
            });

        });

    }

};

