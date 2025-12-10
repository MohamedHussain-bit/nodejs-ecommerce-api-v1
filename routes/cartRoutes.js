const express = require('express');

const {
    addProductToCart,
} = require('../controller/cartController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected, 
        authController.allowedTo('user'),
        addProductToCart
    )


module.exports = router;