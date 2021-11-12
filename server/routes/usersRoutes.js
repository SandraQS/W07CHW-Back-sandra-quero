const express = require("express");
const { userCreate } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/register", userCreate);

router.post("/login", (req, res) => {
  res.json("login");
});

module.exports = router;
