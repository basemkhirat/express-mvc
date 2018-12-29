var router = require("express").Router();

router.post("/token", AuthController.token);
router.get("/user", TokenAuth, UserController.find);
router.get("/user/:id", TokenAuth, UserController.findOne);
router.post("/user", TokenAuth, UserController.create);
router.put("/user/:id", TokenAuth, UserController.update);
router.delete("/user/:id", TokenAuth, UserController.destroy);

module.exports = router;
