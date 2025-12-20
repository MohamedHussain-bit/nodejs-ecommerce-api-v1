const express = require('express');

const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem
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

router.route('/:itemId')
    .delete(
        authController.protected,
        authController.allowedTo('user'),
        removeSpecificCartItem
    )

module.exports = router;