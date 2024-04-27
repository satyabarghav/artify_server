const UserController = require('../controllers/UserController');
const express = require('express');
const userRouter = express.Router();
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.get('/:userId/verify/:token', UserController.verify);

module.exports = userRouter;