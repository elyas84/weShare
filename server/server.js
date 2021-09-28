require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const dbconnection = require('./database/db')
dbconnection()
const morgan = require('morgan')
const cors = require('cors')
app.use(morgan("dev"))
app.use(cors())
/**Body parser */
app.use(express.json())

/** Routers APIS */

const userRouter = require('./routers/userRoute')
const postRouter = require('./routers/postRoute')
const uploadRouter = require('./routers/uploadRoute')
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/uploads/",uploadRouter)

/** file handling */
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
let gfs;
var conn = mongoose.createConnection(process.env.MONGO_DB_URL);
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

// retrive iamge

app.get("/api/uploads/image", async (req, res) => {
    try {
      file = await gfs.files.findOne(
        { filename: req.query.filename },
        (err, file) => {
          if (err) {
            res.status(500).json(err);
          } else {
            if (!file || file.length === 0) {
              res.status(404).json({
                message: "No file found",
              });
            } else {
              const readStream = gfs.createReadStream(file.filename);
              readStream.pipe(res);
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });






app.listen(PORT, ()=>{
    console.log("server is running on port: "+PORT)
})
