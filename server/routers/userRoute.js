const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { private, admin } = require("../middlewares/auth");
const userInputCheck = require("../middlewares/userInputValidator");

// GET all users and GET user
router.route("/").get(private, admin, userController.getUsers);
// UPDATE PROFILE
router
  .route("/profile")
  .put(private, userController.updateProfile)
  .get(private, userController.userProfile);
// DELETE ACCOUNT
router
  .route("/:id")
  .get(private, userController.getUser)
  .delete(private, admin, userController.deleteAccount);
// LOGIN
router.route("/login").post(userController.login);
// REGISTER
router.route("/register").post(userInputCheck, userController.register);

// FOLLOW
router.route("/:id/follow").put(private, userController.toFollow);
// UNFOLLOW
router.route("/:id/unfollow").put(private, userController.toUnFollow);

// get friendList
router.route("/followingsfriends/:id").get(private, userController.getFollowingFriends )
router.route("/followerfriends/:id").get(private, userController.getFollwedFriends )

// get friendsFollowings
router.route("/friendsfollowings/:id").get(private, userController.getFriendsFollowings)
// get friendsFollowers
router.route("/friendsfollowers/:id").get(private, userController.getFriendsFollowers)
module.exports = router;
