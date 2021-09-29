const Post = require("../models/postModel");
const User = require("../models/userModel");

// @desc GET posts of Followings
// @route /api/posts
// @access private

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "username profilePicture _id");
    if (posts && posts.length === 0) {
      return res.status(404).json({
        message: "There are no posts found",
      });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// @desc GET post
// @route /api/posts/single/:id
// @access private

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "There is no post",
      });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// @desc CREATE a post
// @route /api/posts
// @access private

exports.createPost = async (req, res) => {
  const { desc, imagePost } = req.body;

  try {
    const post = new Post({
      desc,
      imagePost,
      createdBy: req.user._id,
    });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// @desc Update a post
// @route /api/posts:id
// @access private

exports.editPost = async (req, res) => {
  const { desc, image } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "post can't find",
      });
    } else {
      post.desc = req.body.desc || post.desc;
      post.imagePost = req.body.imagePost || post.imagePost;
      const updatedPost = await post.save();
      res.status(200).json({
        desc: updatedPost.desc,
        imagePost: updatedPost.imagePost,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.userPost = async (req, res) => {
  try {
    const myposts = await Post.find({ createdBy: req.user._id })
      .populate("createdBy", "username profilePicture")
      .sort("created");
    if (myposts && myposts.length === 0) {
      return res.status(404).json({ message: "There is no post" });
    }
    res.status(200).json(myposts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc Delete a post
// @route /api/posts:id
// @access private

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post bot found.",
      });
    }
    await post.deleteOne({
      _id: post._id,
    });

    res.status(200).json({
      message: "Post deleted.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc LIKE a post
// @route /api/posts:id/like
// @access private

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      return res.status(200).json({
        message: "Post is liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      return res.status(200).json({
        message: "Dislaked!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};
