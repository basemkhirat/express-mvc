var i18n = require('i18n');

i18n.configure(_config("i18n"));

module.exports = function (req, res, next) {

    i18n.init(req, res);

    global._lang = res.__;

    return next();
};
