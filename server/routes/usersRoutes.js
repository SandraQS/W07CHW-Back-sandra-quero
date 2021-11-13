const express = require("express");
const { validate } = require("express-validation");
const { userCreate, userLogin } = require("../controllers/usersControllers");
const { userLoginValidation } = require("../schemas/userSchema");

const router = express.Router();

router.post("/register", userCreate);
router.post("/login", validate(userLoginValidation), userLogin);

module.exports = router;
