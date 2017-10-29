module.exports = function (app) {

    app.post("/api/token", app.controllers.AuthController.token);

    app.get("/user", app.controllers.UserController.find);
    app.get("/user/:id", app.controllers.UserController.findOne);
    app.post("/user", app.controllers.UserController.create);
    app.put("/user/:id", app.controllers.UserController.update);
    app.delete("/user/:id", app.controllers.UserController.destroy);

};
