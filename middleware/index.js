const { ErrorHandler } = require("express-error-bouncer");
const User = require("../data/models/user");
const bcrypt = require("bcrypt");
const validateUser = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler("400", "Email or Password cannot be empty");
    }
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(String(email).toLowerCase())) {
      throw new ErrorHandler("400", "Invalid email");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const { email, password } = req.headers;
    if (!email || !password) {
      res.status(401).json({ message: "Invalid Credentials" });
    }
    const user = await User.find({ email });
    const isMatched =
      user && await bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new ErrorHandler(401, "Invalid Credentials");
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  validateUser,
  isLoggedIn
};
