const express = require('express');

const {
    createCashOrder,
} = require('../controller/orderController');
const autController = require('../controller/authController');

const router = express.Router();

router.route('/:cartId')
    .post(autController.protected , autController.allowedTo('user') , createCashOrder)

module.exports = router;