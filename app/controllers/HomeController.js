module.exports = {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index: function (req, res, next) {
        return res.render("hello");
    }
};
