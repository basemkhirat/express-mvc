var fs = require("fs");
var path = require("path");

/**
 * Scan Directories
 * @param dir
 * @returns {Array}
 */

module.exports = function (dir) {

    var files = fs.readdirSync(dir);

    filelist = [];

    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isFile()) {
            filelist.push(file.replace(".js", ""));
        }
    });

    return filelist;
};
