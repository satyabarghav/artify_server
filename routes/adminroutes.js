const AdminController = require('../controllers/AdminController');
const express = require('express');
const adminRouter = express.Router();
adminRouter.post('/login', AdminController.login);
adminRouter.get('/viewUsers', AdminController.viewUsers);
adminRouter.get('/viewArts', AdminController.viewArts);
adminRouter.delete('/deleteUser/:id', AdminController.deleteUser);
adminRouter.delete('/deleteArt/:id', AdminController.deleteArt);
module.exports = adminRouter;
