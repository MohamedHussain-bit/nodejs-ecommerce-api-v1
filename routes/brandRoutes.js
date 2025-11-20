const express = require('express');

const {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage
} = require('../controller/brandController');

const {
    createBrandValidator,
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require('../utils/validatorRoles/brandValidator');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        uploadBrandImage, 
        resizeImage, 
        createBrandValidator, 
        createBrand
    )
    .get(getBrands)

router.route('/:id')
    .get(getBrandValidator , getBrand)
    .put(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        uploadBrandImage, 
        resizeImage, 
        updateBrandValidator, 
        updateBrand
    )
    .delete(
        authController.protected,
        authController.allowedTo('admin'),
        deleteBrandValidator, 
        deleteBrand
    )    

module.exports = router;