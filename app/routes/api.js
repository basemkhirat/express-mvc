module.exports = function (app) {
    app.get("/user", UserController.find);
    app.get("/user/:id", UserController.findOne);
    app.post("/user", UserController.create);
    app.put("/user/:id", UserController.update);
    app.delete("/user/:id", UserController.destroy);
};
