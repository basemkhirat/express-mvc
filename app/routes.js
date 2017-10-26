module.exports = function (app) {

    app.get("homepage", "/", HomeController.index);

    app.get("users", "/users", Auth, HomeController.users);
};
