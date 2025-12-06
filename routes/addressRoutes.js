const express = require('express');

const {
    addAddress,
    removeAddress,
    getLoggedUserAddresses,
} = require('../controller/addresseController');

const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('user'),
        addAddress
    )
    .get(
        authController.protected, 
        authController.allowedTo('user'), 
        getLoggedUserAddresses
    )

router.route('/:addressId')
    .delete(
        authController.protected,
        authController.allowedTo('user'),
        removeAddress
    )

module.exports = router;