module.exports = {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index: function (req, res, next) {
        return res.render("hello");
    },

    /**
     * Users json response
     * @param req
     * @param res
     * @param next
     */
    users: function (req, res, next) {

        User.find(function (error, result) {

            if(error) return res.serverError(error);

            return res.ok(result);
        });

    }
};
