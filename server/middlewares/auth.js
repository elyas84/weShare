const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// protect route ==> only the autorized user can be accessed

const private = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.id).select("-password");
      next();

      // console.log("req.user", req.user);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "No Token Passed",
    });
  }

  if (!token) {
    return res.status(400).json({
      message: "Unauthorized user, Please Login",
    });
  }
};

// admin route ==> only the autorized user (Admin) can be accessed

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(400).json({
      message: "Unauthorized user, User must be an Admin",
    });
  }
};

module.exports = { private, admin };
