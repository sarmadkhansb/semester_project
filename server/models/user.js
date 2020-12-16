const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "user",
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    hide: true,
  },
});

// var UserSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//   });
//   const User = mongoose.model("User", UserSchema);
//   module.exports = User;

var User = (module.exports = mongoose.model("User", UserSchema));

/*module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
}*/

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.createUser = function (newUser, callback) {
  bcrypt.hash(newUser.password, 10, async function (err, hash) {
    if (err) throw err;
    // Set hashed password
    newUser.password = hash;
    //create user

    await newUser.save(callback);
  });
};
