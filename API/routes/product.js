const express = require('express');

const router = express.Router();

const authorize = require('../middleware/authorize');
const validateInput = require('../middleware/input-validator');

const productController = require('../controllers/product');

// route to get a product
router.get('/product/:id', authorize, productController.getOneProduct);

// route to get all products
router.get('/products/', productController.getAllProducts);

// route to get all products of an user
router.get('/products/:user', productController.getAllProductsFromUser);

// route to add a new product
router.post('/product/create', authorize, validateInput, productController.createProduct);

// route to update a product
router.put('/product/:id', authorize, validateInput, productController.modifyProduct);

// route to delete a product
router.delete('/product/:id', authorize, productController.deleteProduct);

module.exports = router;
