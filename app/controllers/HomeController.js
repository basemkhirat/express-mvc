module.exports = {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index: function (req, res, next) {

        // Logging In

        /*
        req.login({id: "59f4856fd3b99e1d311ef94a"}, function (error) {
            if (error) return next(error);
            return res.redirect("/profile");
        });
        */

        return res.render("hello");
    },

    /**
     * Get current user
     * @param req
     * @param res
     */
    profile: function (req, res) {
        return res.json(req.user.toJSON());
    }
};
