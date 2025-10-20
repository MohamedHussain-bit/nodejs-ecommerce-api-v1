const express = require('express');

const {
    CreateProduct,
    getProducts,
    getProduct,
} = require('../controller/productController');

const {
    createProductValidation,
    getProductValidation,
} = require('../utils/validatorRoles/productValidator');

const router = express.Router();

router.route('/')
    .post(createProductValidation , CreateProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProductValidation , getProduct)

module.exports = router;