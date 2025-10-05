const express = require('express');
const { authJWT } = require('../middleware/auth');
const { me } = require('../controllers/userController');
const userRouter = express.Router();
userRouter.route('/me')
  .get(authJWT, me);

module.exports = {
  userRouter
};