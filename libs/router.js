var methods = require('methods');

module.exports = function(options) {
    if (!options) options = {};
    if (!options.helperName) options.helperName = '_route';
    augmentVerbs(app);
    addHelper(app, options);
    addMiddleware(app, options);
};

function augmentVerbs() {
    methods.forEach(function(method) {
        var _fn = app[method];
        app[method] = function(name, path) {
            if ((method == 'get' && arguments.length == 1) ||
                (typeof(path) != 'string' && !(path instanceof String)))
                return _fn.apply(this, arguments);

            if (app._namedRoutes && app._namedRoutes[name])
                throw new Error('Route already defined: ' + name);

            var args = Array.prototype.slice.call(arguments, 0);
            args.shift();
            var ret = _fn.apply(this, args);

            if (!app._namedRoutes) app._namedRoutes = {};
            app._namedRoutes[name] = (typeof this.route !== 'string')
                ? this.route(args[0]) // express 4.x
                : this.routes[method].slice(-1)[0]; // express 3.x

            return ret;
        };
    });
}

function addHelper(options) {
    global[options.helperName] = function(name, params) {
        var route = app._namedRoutes[name];
        if (!route) throw new Error('Route not found: ' + name);
        var mountpath = (app.mountpath && app.mountpath != '/') ? app.mountpath : '';
        var path = mountpath + reverse(app._namedRoutes[name].path, params)
        return _url(path.replace(/^\/|\/$/g, ''));
    };
}

function addMiddleware(options) {
    app.use(function(req, res, next) {
        res.redirectToRoute = function(status, routeName, params) {
            if (isNaN(status)) {
                params = routeName;
                routeName = status;
            }
            var mountpath = (app.mountpath && app.mountpath != '/') ? app.mountpath : '';
            var url = mountpath + reverse(app._namedRoutes[routeName].path, params);
            if (isNaN(status)) return res.redirect(url);
            else return res.redirect(status, url);
        };
        next();
    });
}

function reverse(path, params) {
    if (!params) params = {};
    return path.replace(/(\/:(\w+)?(\(.+?\))?(\?)?)/g, function (m, pFull, pName, pRegex, pOptional) {
        var required = !pOptional;
        var param = pName;
        if (required && !params.hasOwnProperty(param)) {
            throw new Error('Missing value for "' + param + '".');
        }

        var value = params[param];
        if (pRegex && value) {
            if (!new RegExp('^' + pRegex + '$').test(value)) {
                throw new Error('Invalid value for "' + param + '", should match "' + pRegex + '".');
            }
        }
        return value ? '/' + value : '';
    });
}
