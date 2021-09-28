const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
// Create a storage object with a given configuration
const { GridFsStorage } = require("multer-gridfs-storage");
const mongodb_URL = process.env.MONGO_DB_URL;

const storage = new GridFsStorage({
  url: mongodb_URL,
  // options: {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // },

  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "photos",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @desc upload image
// @route /api/uploads
router.post("/", upload.single("myFile"), (req, res) => {
  res.status(201).json(req.file);
});

module.exports = router;