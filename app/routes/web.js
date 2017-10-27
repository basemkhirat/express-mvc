module.exports = function (app) {
    app.get("/", HomeController.index);
};
