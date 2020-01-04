const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Create Schema
const UserSchema = new Schema({
  name: {
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

module.exports = User = mongoose.model("users", UserSchema);
