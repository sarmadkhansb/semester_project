var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var fs = require("fs");
var jwt = require("jsonwebtoken");
var User = require("../models/user");

router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    "SomePrivateKey"
  );

  res.send(token);
});

router.get("/fail", function (req, res, next) {
  console.log(req.username);
  console.log("fail");
  res.status(200).send("invalid username or password");
});

module.exports = router;
