var router = require("express").Router();

router.post("/token", app.controllers.AuthController.token);

router.get("/user", app.controllers.UserController.find);
router.get("/user/:id", app.controllers.UserController.findOne);
router.post("/user", app.controllers.UserController.create);
router.put("/user/:id", app.controllers.UserController.update);
router.delete("/user/:id", app.controllers.UserController.destroy);

module.exports = router;
