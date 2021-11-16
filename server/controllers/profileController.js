require("dotenv").config();
const User = require("../../database/models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch {
    const error = new Error("No encontrado");
    error.code = 404;
    next(error);
  }
};

const addFriends = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      const error = new Error("Id no ncontrada");
      error.code = 404;
      next(error);
    } else {
      const { userInfo } = req;
      const myFriend = await User.findOne({ _id: id });
      const myUser = await User.findOne({ _id: userInfo.id });
      myUser.friends = [...myUser.friends, myFriend.id];
      await myUser.save(myUser);
      res.json({ myUser });
    }
  } catch {
    const error = new Error("No encontrado");
    error.code = 404;
    next(error);
  }
};

const getFriends = async (req, res) => {
  try {
    const { id } = req.userInfo;
    const myUser = await User.findById(id).populate({
      path: "friends",
      select: "username",
    });
    res.json(myUser);
  } catch {
    const error = new Error("Algo ha fallado");
    error.code = 401;
  }
};

module.exports = { getUsers, addFriends, getFriends };
