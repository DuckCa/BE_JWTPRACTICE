const express = require("express");
const delay = require("../middleware/delay");
const {
  createUser,
  handleLogin,
  getUser,
} = require("../controllers/userController");
const routerAPI = express.Router();

routerAPI.all("*", delay);
routerAPI.get("/", (req, res) => {
  return res.status(200).json("HELLO WORLD API");
});
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
module.exports = routerAPI; //export default
