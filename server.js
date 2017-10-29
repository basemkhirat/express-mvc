#!/usr/bin/env node

global.__basepath = process.cwd();

global.app = new require("express")();

require("./app");

require("./app/kernel");

app.listen(_config.app.port);
