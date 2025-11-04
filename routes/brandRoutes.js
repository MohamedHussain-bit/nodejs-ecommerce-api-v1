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

const router = express.Router();

router.route('/')
    .post(uploadBrandImage , resizeImage , createBrandValidator , createBrand)
    .get(getBrands)

router.route('/:id')
    .get(getBrandValidator , getBrand)
    .put(uploadBrandImage , resizeImage , updateBrandValidator , updateBrand)
    .delete(deleteBrandValidator , deleteBrand)    

module.exports = router;