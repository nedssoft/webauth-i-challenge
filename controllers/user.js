const User = require("../data/models/user");
const { ErrorHandler } = require("express-error-bouncer");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    if (hashedPassword) {
      const userData = { email, password: hashedPassword };
      const user = await User.createUser(userData);
      if (!user) {
        throw new ErrorHandler(500, "Could not save new user");
      }
      return res.status(201).json({
        "message:": "OK",
        user
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser
}
