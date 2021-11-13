const express = require("express");
const auth = require("../middlewares/auth");
const { getUsers, addFriends } = require("../controllers/profileController");

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/friends", auth, addFriends);

module.exports = router;
