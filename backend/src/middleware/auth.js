const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authJWT = async (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: user.role
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const admin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = {
  authJWT,
  admin
};