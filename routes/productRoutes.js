const express = require('express');

const {
    CreateProduct,
} = require('../controller/productController');

const {
    createProductValidation,
} = require('../utils/validatorRoles/productValidator');

const router = express.Router();

router.route('/')
    .post(createProductValidation , CreateProduct)

module.exports = router;