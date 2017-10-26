var express = require("express");
var path = require("path");

require(path.join(__basepath, "libs/mongoose"));

module.exports = function (app) {

    app.use(express.static(path.join(__basepath, "public")));

    app.use(require('../libs/i18n'));

    app.use(function (req, res, next) {
        var origRender = res.render;
        res.render = function (view, locals, callback) {
            if ('function' == typeof locals) {
                callback = locals;
                locals = undefined;
            }
            if (!locals) {
                locals = {};
            }
            locals.req = req;
            origRender.call(res, view, locals, callback);
        };
        next();
    });

    app.use(require("body-parser").urlencoded(_config.body));

    app.use(require("body-parser").json());

    app.use(require("express-validator")());

    app.use(require("cookie-parser")());

    app.use(require("express-session")(_config.session));

    app.use(require("express-flash")());

    require("./routes")(app);

    app.use(function (req, res) {
        return res.notFound();
    });

    app.use(function (error, req, res, ne) {
        return res.serverError(error.message);
    });
};
