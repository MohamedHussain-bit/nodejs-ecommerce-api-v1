const express = require('express');

const {
    CreateProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controller/productController');

const {
    createProductValidation,
    getProductValidation,
    updateProductValidation,
    deleteProductValidation
} = require('../utils/validatorRoles/productValidator');

const router = express.Router();

router.route('/')
    .post(createProductValidation , CreateProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProductValidation , getProduct)
    .put(updateProductValidation , updateProduct)
    .delete(deleteProductValidation , deleteProduct)

module.exports = router;