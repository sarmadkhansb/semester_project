var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressValidator = require("express-validator");
var cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishesRouter = require("./routes/dishes");

var User = require("./models/user");

require("dotenv").config();

const mongoose = require("mongoose");
var passport = require("passport");

var db = require("monk")("mongodb://localhost/webProject");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect("mongodb://localhost:27017/webProject", options);

app.use(logger("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  expressValidator({
    customValidators: {
      usernameExistsAsync: async function (value) {
        var user = await Users.find({ username: value });
        return user.length == 0;
      },
      usernameExistsPromise: function (value) {
        Users.find({ username: value })
          .then(function (result) {
            return result.length == 0;
          })
          .catch(function (err) {
            console.log(err);
          });
      },
    },
  })
);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use(
  expressValidator({
    customValidators: {
      gte: function (param, num) {
        return param >= num;
      },
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set("port", process.env.PORT || 4000);

http.listen(app.get("port"), function () {
  console.log("listening on port");
});
