const express = require('express');

const {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
} = require('../controller/brandController');

const {
    createBrandValidator,
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require('../utils/validatorRoles/brandValidator');

const router = express.Router();

router.route('/')
    .post(createBrandValidator , createBrand)

module.exports = router;