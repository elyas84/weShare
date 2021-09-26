const mongoose = require("mongoose");
const dbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGODB || process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = dbCon;
