var router = require("express").Router();

router.post("/token", AuthController.token);
router.get("/user", UserController.find);
router.get("/user/:id", UserController.findOne);
router.post("/user", UserController.create);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);

module.exports = router;
