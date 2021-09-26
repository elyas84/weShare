const express = require("express");
const router = express.Router();
const { private, admin } = require("../middlewares/auth");
const postController = require("../controllers/postController");

router
  .route("/")
  .get(private, admin, postController.getPosts)
  .post(private, postController.createPost);
router
  .route("/:id")
  .put(private, postController.editPost)
  .delete(private, postController.deletePost);
  
router.route("/userposts").get(private, postController.userPost);
router.route("/:id/like").put(private, postController.like);


router.route("/byId/:id").get(private, postController.getPost)
module.exports = router;
