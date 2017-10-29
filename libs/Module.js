var fs = require("fs");
var path = require("path");

module.exports = {

    cache: [],

    /**
     * Fetch files from directory
     * @returns {{}|*}
     */
    fetch: function (f) {

        var files = fs.readdirSync(dir);

        filelist = [];

        files.forEach(function (file) {
            if (fs.statSync(path.join(dir, file)).isFile()) {
                filelist.push(file.replace(".js", ""));
            }
        });

        return filelist;
    },



    load: function ($arg) {
       var module = require(path.join(dir, file));
       return arg ? module : module($arg);
    }

}
