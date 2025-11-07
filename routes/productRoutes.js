const express = require('express');

const {
    CreateProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImage
} = require('../controller/productController');

const {
    createProductValidation,
    getProductValidation,
    updateProductValidation,
    deleteProductValidation
} = require('../utils/validatorRoles/productValidator');

const router = express.Router();

router.route('/')
    .post(uploadProductImages , resizeProductImage ,createProductValidation , CreateProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProductValidation , getProduct)
    .put(uploadProductImages , resizeProductImage , updateProductValidation , updateProduct)
    .delete(deleteProductValidation , deleteProduct)

module.exports = router;