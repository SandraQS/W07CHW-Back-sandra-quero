const express = require("express");
const auth = require("../middlewares/auth");
const {
  getUsers,
  addFriends,
  getFriends,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/friends", auth, addFriends);
router.get("/friends", auth, getFriends);

module.exports = router;
