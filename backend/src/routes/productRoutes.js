const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');
const stockAlert = require('../middleware/stockAlert');

router.get('/low-stock', productController.getLowStock);

// CRUD Principal
router.route('/')
    .get(productController.getAllProducts)
    .post(validateProduct, stockAlert, productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .put(validateProduct, stockAlert, productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;