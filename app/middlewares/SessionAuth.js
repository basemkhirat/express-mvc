module.exports = function (req, res, next) {

    if (req.isAuthenticated()) return next();

    return res.forbidden();
};
