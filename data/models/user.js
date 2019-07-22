const db = require("../config");
const { ErrorHandler } = require("express-error-bouncer");

const createUser = userData => {
  try {
    const user = db("users").insert(userData);
    if (user) {
      return user;
    }
    throw new ErrorHandler(500, "Internal server error");
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createUser
};
