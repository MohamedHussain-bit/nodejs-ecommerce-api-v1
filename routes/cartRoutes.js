const express = require('express');

const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearLoggedUserCart,
    updateCartItemsQuantity,
    applyCoupon,
} = require('../controller/cartController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected, 
        authController.allowedTo('user'),
        addProductToCart
    )
    .get(
        authController.protected,
        authController.allowedTo("user"),
        getLoggedUserCart
    )
    .delete(
        authController.protected,
        authController.allowedTo('user'),
        clearLoggedUserCart
    )

router.route('/:itemId')
    .delete(
        authController.protected,
        authController.allowedTo('user'),
        removeSpecificCartItem
    )
    .put(
        authController.protected,
        authController.allowedTo('user'),
        updateCartItemsQuantity
    )

router.route('/applyCoupon')
    .put(applyCoupon)

module.exports = router;