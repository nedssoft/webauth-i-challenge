const User = require("../data/models/user");
const { ErrorHandler } = require("express-error-bouncer");
// const bcrypt = require("bcrypt");
const bcrypt = require("../helpers/bcrypt");

const createNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, {rounds: 20 });
    if (hashedPassword) {
      const userData = { email, password: hashedPassword };
      const user = await User.createUser(userData);
      if (!user) {
        throw new ErrorHandler(500, "Could not save new user");
      }
      return res.status(201).json({
        "message:": "registration successful",
        user
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    const isMatched = user && (await bcrypt.compare(password, user.password));
    if (!isMatched) {
      throw new ErrorHandler(401, "You shall not pass!");
    }
    req.session.user = user;
    return res.status(200).json({
      user,
      message: "Login successful"
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getUsers();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    if (req.session.id) {
      req.session.destroy();
    }
    res.end("Logged out!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  loginUser,
  getAllUsers,
  logout
};
