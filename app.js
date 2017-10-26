global.app = new require("express")();

var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");
var path = require("path");
var merge = require("./libs/merge");
var walkSync = require("./libs/walkSync");
require(path.join(__basepath, "libs/router"))(app);

global._config = {};

/**
 * Config files
 */
walkSync("./config").forEach(function (file) {
    _config[file.replace(".js", "")] = require("./config/" + file);
});

var env_config_path = path.join(__basepath, "config/env/" + _config.app.env);

if (fs.existsSync(env_config_path + ".js")) {
    var env_config = require(env_config_path);
    _config = merge.recursive(true, _config, env_config);
}

/**
 * Responses
 */
app.use(function (req, res, next) {

    walkSync("./app/responses").forEach(function (file) {
        this.req = req, this.res = res;
        res[file.replace(".js", "")] = require("./app/responses/" + file).bind(this);
    });

    next();
});

/**
 * Services
 */
walkSync("./app/services").forEach(function (file) {
    global[file.replace(".js", "")] = require("./app/services/" + file);
});

/**
 * Middlewares
 */
walkSync("./app/middlewares").forEach(function (file) {
    global[file.replace(".js", "")] = require("./app/middlewares/" + file);
});

/**
 * Models
 */
walkSync("./app/models").forEach(function (file) {
    global[file.replace(".js", "")] = require("./app/models/" + file)(mongoose);
});

/**
 * controllers
 */
walkSync("./app/controllers").forEach(function (file) {
    global[file.replace(".js", "")] = require("./app/controllers/" + file);
});


app.set("env", _config.app.env);
app.set("views", _config.app.views);
app.set("view engine", _config.app.view_engine);
app.set("x-powered-by", _config.app.x_powered_by);

module.exports = app;
