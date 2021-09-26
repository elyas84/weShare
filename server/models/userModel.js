const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 40,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    coverPicture: {
      type: String,
      default: null,
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
 
    password: {
      type: String,
      required: true,
      min: 5,
      max: 80,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  /** new user, updated users etc will updated the timestapms */
  { timestamps: true }
);

// decrype the password
userSchema.methods.verifyPassword = async function (typedPasswrod) {
  return await bcrypt.compare(typedPasswrod, this.password);
};

module.exports = mongoose.model("User", userSchema);
