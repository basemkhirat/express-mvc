module.exports = function (req, res, next) {

    if (Token.check()) {
        return next();
    }

    return res.badRequest();
};
