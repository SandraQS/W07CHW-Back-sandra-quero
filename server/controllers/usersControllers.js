require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameExist = await User.findOne({ username });
    if (!usernameExist) {
      const error = new Error("Parece que algo ha fallado");
      error.code = 401;
      next(error);
    } else {
      const passwordExist = await bcrypt.compare(
        password,
        usernameExist.password
      );
      if (!passwordExist) {
        const error = new Error("Parece que algo ha fallado");
        error.code = 401;
        next(error);
      } else {
        const token = jwt.sign(
          { usernameExist, id: usernameExist.id },
          process.env.SECRET_TOKEN
        );
        res.json({ token });
      }
    }
  } catch {
    const error = new Error("No estás autorizado");
    error.code = 401;
    next(error);
  }
};

module.exports = { userCreate, userLogin };
