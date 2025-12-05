const express = require('express');

const {
    addProductToWishlist,
} = require('../controller/wishListController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('user'),
        addProductToWishlist
    )

module.exports = router;