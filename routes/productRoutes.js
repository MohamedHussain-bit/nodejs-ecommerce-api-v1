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

const authController = require('../controller/authController');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

// POST    /products/jfjhfhff4445/reviews
// GET     /products/jfjhfhff4445/reviews
// GET     /products/jfjfhjof5412/reviews/jdhdbhlss5441
router.use('/:productId/reviews' , reviewRoutes);

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        uploadProductImages, 
        resizeProductImage,
        createProductValidation, 
        CreateProduct
    )
    .get(getProducts)

router.route('/:id')
    .get(getProductValidation , getProduct)
    .put(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        uploadProductImages, 
        resizeProductImage, 
        updateProductValidation, 
        updateProduct
    )
    .delete(
        authController.protected,
        authController.allowedTo('admin'),
        deleteProductValidation, 
        deleteProduct
    )

module.exports = router;