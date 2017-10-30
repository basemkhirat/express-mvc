var router = require("express").Router();

router.get("/", HomeController.index);
router.get("/logout", AuthController.logout);
router.get("/profile", SessionAuth, HomeController.profile);

module.exports = router;
