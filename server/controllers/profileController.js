require("dotenv").config();
const User = require("../../database/models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch {
    const error = new Error("Not found");
    error.code = 400;
    next(error);
  }
};

module.exports = { getUsers };
