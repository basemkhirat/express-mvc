#!/usr/bin/env node

global.__basepath = process.cwd();

global.app = new require("express")();

global.async = new require("async");

require("./app");

require("./app/kernel");

app.listen(_config("app.port"), function () {
    console.log("Server is listening at port " + _config("app.port"));
});
