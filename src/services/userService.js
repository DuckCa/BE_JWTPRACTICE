require("dotenv").config();
const User = require("../models/user");
const bycrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const createUserService = async (name, email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log(`Email "${email}" đã tồn tại! `);
      return null;
    }
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
    console.log(">>>CHECK TIME:", process.env.JWT_EXPIRE);
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      const isMatchPassword = await bycrypt.compare(password, user.password);

      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password not valid",
        };
      } else {
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = await jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        };
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
const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
};
