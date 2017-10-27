#!/usr/bin/env node

global.__basepath = process.cwd();

var app = require("./app");

require("./app/http")(app);

app.listen(_config.app.port);
