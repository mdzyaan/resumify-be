const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mobile: {
    type: Number,
    required: false,
    default: '',
  },
  website: {
    type: String,
    required: false,
    default: '',
  },
  bio: {
    type: String,
    required: false,
    default: '',
  },
  city: {
    type: String,
    required: false,
    default: '',
  },
  country: {
    type: String,
    required: false,
    default: '',
  },
  picture: {
    type: String,
    required: false,
    default: '',
  },
  designation: {
    type: String,
    required: false,
    default: '',
  }
});

UserSchema.pre("save", function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = User = mongoose.model("users", UserSchema);
