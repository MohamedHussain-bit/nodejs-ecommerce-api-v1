const express = require('express');

const {
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist,
} = require('../controller/wishListController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('user'),
        addProductToWishlist
    )
    .get(
        authController.protected, 
        authController.allowedTo('user'), 
        getLoggedUserWishlist
    )

router.route('/:productId')
    .delete(
        authController.protected,
        authController.allowedTo('user'),
        removeProductFromWishlist
    )

module.exports = router;