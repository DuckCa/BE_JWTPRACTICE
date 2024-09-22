const User = require("../models/user");
const bycrypt = require("bcrypt");
const saltRounds = 10;
const createUserService = async (name, email, password) => {
  try {
    const hashPassword = await bycrypt.hash(password, saltRounds);
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "DUCK",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
};
