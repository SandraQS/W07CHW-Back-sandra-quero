const express = require("express");
const { userCreate, userLogin } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/register", userCreate);
router.post("/login", userLogin);

module.exports = router;
