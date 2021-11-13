const express = require("express");
const auth = require("../middlewares/auth");
const { getUsers } = require("../controllers/profileController");

const router = express.Router();

router.get("/", auth, getUsers);

module.exports = router;
