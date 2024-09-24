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
const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      const isMatchPassword = await bycrypt.compare(password, user.password);
      console.log(">>>>>>>>CHECK ismatchPass:", isMatchPassword);

      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password not valid",
        };
      } else {
        return "create an access token";
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password not valid",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createUserService,
  loginService,
};
