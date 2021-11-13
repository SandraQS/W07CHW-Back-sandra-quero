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

const addFriends = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userInfo } = req;
    const myUser = await User.findOne({ _id: userInfo.id });

    myUser.friends = [...myUser.friends, id];
    await myUser.save(myUser);
    res.json({ myUser });
  } catch {
    const error = new Error("No encontrado");
    error.code = 404;
    next(error);
  }
};

module.exports = { getUsers, addFriends };
