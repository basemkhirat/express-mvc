require("./libs/helpers");

/* Configurations */

app.loadConfig();

/* Responses */

app.loadResponses();

/* Services */

app.loadServices();

/* Middlewares */

app.loadMiddlewares();

/* Models */

app.loadModels();

/* Controllers */

app.loadControllers();

app.set("env", _config.app.env);
app.set("views", _config.app.views);
app.set("view engine", _config.app.view_engine);
app.set("x-powered-by", _config.app.x_powered_by);
app.set('trust proxy', 1)

module.exports = app;
