const express = require('express');

const {
    createCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon,
} = require('../controller/couponController');

const {
    createCouponValidator,
    getSpecificCouponValidator,
    updateCouponValidator,
    deleteCouponValidator,
} = require('../utils/validatorRoles/couponValidator');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(authController.protected, 
        authController.allowedTo('admin' , 'manager'), 
        createCouponValidator,
        createCoupon
    )
    .get(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        getCoupons
    )

router.route('/:id')
    .get(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        getSpecificCouponValidator,
        getCoupon
    )
    .put(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        updateCouponValidator,
        updateCoupon
    )
    .delete(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        deleteCouponValidator,
        deleteCoupon
    )

module.exports = router;