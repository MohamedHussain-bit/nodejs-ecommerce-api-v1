const express = require('express');

const {
    CreateProduct,
    getProducts,
    getProduct,
    updateProduct
} = require('../controller/productController');

const {
    createProductValidation,
    getProductValidation,
    updateProductValidation
} = require('../utils/validatorRoles/productValidator');

const router = express.Router();

router.route('/')
    .post(createProductValidation , CreateProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProductValidation , getProduct)
    .put(updateProductValidation , updateProduct)

module.exports = router;