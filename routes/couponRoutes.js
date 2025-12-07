const express = require('express');

const {
    createCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon,
} = require('../controller/couponController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(authController.protected, 
        authController.allowedTo('admin' , 'manager'), 
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
        getCoupon
    )
    .put(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        updateCoupon
    )
    .delete(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        deleteCoupon
    )

module.exports = router;