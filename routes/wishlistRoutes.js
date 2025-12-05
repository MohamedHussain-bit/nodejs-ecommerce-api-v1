const express = require('express');

const {
    addProductToWishlist,
    removeProductFromWishlist,
} = require('../controller/wishListController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('user'),
        addProductToWishlist
    )

router.route('/:productId')
    .delete(
        authController.protected,
        authController.allowedTo('user'),
        removeProductFromWishlist
    )

module.exports = router;