const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token not Provided");
  try {
    let user = jwt.verify(token, "SomePrivateKey");
    req.user = await User.findOne({ username: user.username });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
}

module.exports = auth;
