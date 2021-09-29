const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { findById } = require("../models/userModel");

// @desc GET users
// @route /api/users
// @access private

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (users && users.length === 0) {
      return res.status(404).json({
        message: "There are no users yet.",
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "There is no user",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc Create a user
// @route /api/users
// @acess public

exports.register = async (req, res) => {
  // checking users fileds
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  // checking if user is already exist bofore the next stpes
  const { name, username, email, password, isAdmin } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is alreday taken. Please try different value.",
      });
    }
    let userName = await User.findOne({ username });
    if (userName) {
      return res.status(400).json({
        message: "username is alreday taken. Please try different value.",
      });
    }
    // Creating an instence
    user = new User({
      name,
      username,
      email,
      password,
      isAdmin,
    });
    // After creating an instanse, we have to salt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc login
// @route /api/users/login
// @access public

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Mathching the password witch comes from the userSchema
    if (user && (await user.verifyPassword(password))) {
      const generatedToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_KEY);
      };
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        followers: user.followers,
        followings: user.followings,
        isAdmin: user.isAdmin,
        token: generatedToken(user._id),
      });
    }
    return res.status(401).json({
      message: "Invalid username or passoword, please try again,",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc GET the userInfo
// @route /api/users/profile
// access private

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // loggedin user
    if (!user) {
      return res.status(400).json({
        message: "User must be logged in.",
      });
    } else {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        followers: user.followers,
        followings: user.followings,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc updated the userInfo
// @route /api/users/profile
// access private

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // logged in user!

    if (!user) {
      return res.status(400).json({
        message: "No user found,",
      });
    }
    user.username = req.body.username || user.username;
    (user.email = req.body.email || user.email),
      (user.profilePicture = req.body.profilePicture || user.profilePicture),
      (user.coverPicture = req.body.coverPicture || user.coverPicture);

    // passowrd can be updated however must be hashed as well
    if (req.body.password) {
      user.password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const updatedUser = await user.save();
    const generatedTokenAfterUpdate = (id) => {
      return jwt.sign({ id }, process.env.JWT_KEY);
    };
    res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      coverPicture: updatedUser.coverPicture,
      isAdmin: updatedUser.isAdmin,
      token: generatedTokenAfterUpdate(updatedUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc DELETE a user
// @route /api/users/:id
// access private

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User bot found.",
      });
    }
    await user.deleteOne({
      _id: user._id,
    });

    res.status(200).json({
      message: "Account deleted.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc Follow a user
// @route /api/users/:id/follow
// @access private

exports.toFollow = async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);

      if (!userToFollow.followers.includes(req.user.id)) {
        await userToFollow.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { followings: req.user.id } });
        res.status(200).json({
          message: "User has been followed.",
        });
      } else {
        return res.status(400).json({
          message: "You already follow this user.",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: error,
      });
    }
  } else {
    // console.log(req.user.id);

    return res.status(400).json({
      message: "You can't follow yourself.",
    });
  }
};

// @desc UNFOLLOW a user
// @route /api/users/:id/unfollow
// @access private

exports.toUnFollow = async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);

      if (userToFollow.followers.includes(req.user.id)) {
        await userToFollow.updateOne({ $pull: { followers: req.user.id } });
        await currentUser.updateOne({ $pull: { followings: req.user.id } });
        res.status(200).json({
          message: "User has been unfollowed.",
        });
      } else {
        return res.status(400).json({
          message: "You already unfollow this user.",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: error,
      });
    }
  } else {
    // console.log(req.user.id);

    return res.status(400).json({
      message: "You can't unfollow yourself.",
    });
  }
};
