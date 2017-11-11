var router = require("express").Router();

router.get("/", HomeController.index);
router.get("/logout", AuthController.logout);

//router.post("/profile", HomeController.profile);

router.get("/profile", SessionAuth, HomeController.profile);

module.exports = router;
