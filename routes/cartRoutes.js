const express = require('express');

const {
    addProductToCart,
    getLoggedUserCart
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


module.exports = router;