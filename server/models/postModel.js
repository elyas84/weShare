const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    desc: {
      type: String,
      required: true,
      min: 5,
      max: 1000,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  /** new user, updated users etc will updated the timestapms */
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
