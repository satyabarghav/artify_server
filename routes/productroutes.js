const ProductController = require('../controllers/ProductController');
const express = require('express');

const productRouter = express.Router();
productRouter.post('/listItems', ProductController.listItems);
productRouter.get('/getItems', ProductController.getItems);
module.exports = productRouter;