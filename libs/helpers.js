var path = require("path");
var fs = require("fs");
var walkSync = require("./walkSync");
var merge = require("./merge");

app.loadConfig = function () {

    global.__configs = {};

    var directory = path.join(__basepath, "config");

    var config = walkSync(directory);

    config.forEach(function (file) {
        __configs[file] = require(path.join(directory, file));
    });

    var env_config_path = path.join(__basepath, "config/env/" + __configs.app.env);

    if (fs.existsSync(env_config_path + ".js")) {
        var env_config = require(env_config_path);
        __configs = merge.recursive(true, __configs, env_config);
    }
};

app.loadControllers = function () {

    var directory = path.join(__basepath, "app/controllers");

    var files = walkSync(directory);

    var controllers = {};

    files.forEach(function (file) {
        controllers[file] = require(path.join(directory, file));
    });

    if (__configs.globals.controllers) {
        for (var module in controllers) {
            global[module] = controllers[module];
        }
    }

    app.controllers = {};

    for (var module in controllers) {
        app.controllers[module] = controllers[module];
    }
};

app.loadModels = function () {

    var directory = path.join(__basepath, "app/models");

    var files = walkSync(directory);

    var models = {};

    files.forEach(function (file) {
        models[file] = require(path.join(directory, file));
    });

    if (__configs.globals.models) {
        for (var module in models) {
            global[module] = models[module];
        }
    }

    app.models = {};

    for (var module in models) {
        app.models[module] = models[module];
    }
};

app.loadMiddlewares = function () {

    var directory = path.join(__basepath, "app/middlewares");

    var files = walkSync(directory);

    var middlewares = {};

    files.forEach(function (file) {
        middlewares[file] = require(path.join(directory, file));
    });

    if (__configs.globals.middlewares) {
        for (var module in middlewares) {
            global[module] = middlewares[module];
        }
    }

    app.middlewares = {};

    for (var module in middlewares) {
        app.middlewares[module] = middlewares[module];
    }
};

app.loadServices = function () {

    app.use(function (req, res, next) {

        var directory = path.join(__basepath, "app/services");

        var files = walkSync(directory);

        var services = {};

        files.forEach(function (file) {
            services[file] = require(path.join(directory, file));
        });

        if (__configs.globals.services) {
            for (var module in services) {
                global[module] = services[module];
            }
        }

        app.services = {};

        for (var module in services) {
            app.services[module] = services[module];
        }

        next();
    });
};


app.loadResponses = function () {

    app.use(function (req, res, next) {

        var directory = path.join(__basepath, "app/responses");

        var responses = walkSync(directory);

        responses.forEach(function (file) {
            this.req = req, this.res = res;
            res[file] = require(path.join(directory, file)).bind(this);
        });

        next();
    });
};

global._config = function (name) {

    try {
        var value = eval("__configs." + name);
    } catch (err) {
        return null;
    }

    return value != undefined ? value : null;
};


global._url = function (path) {
    var base_url = req.protocol + '://' + req.get('host');
    return path ? base_url + "/" + path : base_url;
};
