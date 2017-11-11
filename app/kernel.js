var express = require("express");
var path = require("path");

/* Building mongodb connection object */

require("express-mvc-platform/lib/mongoose");

/* Enable router named routes */

require("express-mvc-platform/lib/router")();

/* Serving public static files */

app.use(express.static(path.join(__basepath, "public")));

/* Enabling CORS request validation */

app.use(require('cors')(_config("cors")));

/* Loading the i18n localization */

app.use(require("express-mvc-platform/lib/i18n"));

/* Logging in development only */

if(_config("app.env") != "production") {
    app.use(require("morgan")("dev"));
}

/* Loading express validator */

app.use(require("express-validator")());

/* Loading the request body parser */

app.use(require("body-parser").urlencoded(_config("body")));

app.use(require("body-parser").json());

/* Defining the request.isAPI boolean flag */

app.use(function (req, res, next) {
    req.isAPI = req.url.startsWith("/" + _config("app.api_prefix"));
    next();
});

/* Loading the response cookie parser */

app.use(require("cookie-parser")());

/* Loading express session */

app.use(require("express-session")(_config("session")));

// Passport authentication

require("./passport");

/* Serving api routes */

app.use("/" + _config("app.api_prefix"), require("./routes/api"));

/* API 404 error handler */

app.use("/" + _config("app.api_prefix"), function (req, res) {
    return res.notFound();
});

/* API 500 error handler */

app.use("/" + _config("app.api_prefix"), function (error, req, res, next) {
    return res.serverError(error.message);
});

/* Redirect back reponse method res.back() */

app.use(require('express-back')());

/* Enable cross site request forgery */

app.use(require('csurf')(_config("csrf")));

/* Enable session flash messages */

app.use(require("express-flash")());

/* Passing the request object to views */

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

/* Serving web routes */

app.use("/", require("./routes/web"));

/* 404 error handler */

app.use("/", function (req, res) {
    return res.notFound();
});

/* 500 error handler */

app.use(function (error, req, res, next) {
    return res.serverError(error.message);
});

