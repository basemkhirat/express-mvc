#!/usr/bin/env node

global.__basepath = process.cwd();

var app = require("./app");

require("./app/kernel")(app);

app.listen(_config.app.port);
