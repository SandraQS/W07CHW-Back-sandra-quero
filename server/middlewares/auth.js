const chalk = require("chalk");
const debug = require("debug")("series:auth");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.red("No hay autorización"));
    const error = new Error("No estás autorizado");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split("")[1];
    if (!token) {
      debug(chalk.red("No estás autorizado"));
      const error = new Error("No estás autorizado");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userInfo = {
          username: user.username,
          id: user.id,
          name: user.name,
          age: user.age,
          friends: user.friends,
          enemies: user.enemies,
          image: user.image,
        };
        next();
      } catch {
        const error = new Error("Algo va mal");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
