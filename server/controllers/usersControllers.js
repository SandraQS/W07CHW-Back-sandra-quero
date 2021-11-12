require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const userCreate = async (req, res, next) => {
  try {
    const { name, username, password, age, image } = req.body;
    const newUser = await User.create({
      name,
      username,
      password: await bcrypt.hash(password, 10),
      age,
      image,
    });

    res.status(201).json(newUser);
  } catch (error) {
    error.code = 400;
    error.message = "El formato introducido no es válido";
    next(error);
  }
};

module.exports = { userCreate };
