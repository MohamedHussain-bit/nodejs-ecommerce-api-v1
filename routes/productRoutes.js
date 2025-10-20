const express = require('express');

const {
    CreateProduct,
    getProducts
} = require('../controller/productController');

const {
    createProductValidation,
} = require('../utils/validatorRoles/productValidator');

const router = express.Router();

router.route('/')
    .post(createProductValidation , CreateProduct)
    .get(getProducts)

module.exports = router;