const express = require('express');

const {
    createCashOrder,
    getAllOrders,
    getSpecificOrder,
    filterOrderForLoggedUser,
} = require('../controller/orderController');
const autController = require('../controller/authController');

const router = express.Router();

router.route('/:cartId')
    .post(
        autController.protected, 
        autController.allowedTo('user'), 
        createCashOrder
    )

router.route('/')
    .post(
        autController.protected, 
        autController.allowedTo('user' , 'admin' , 'manager'),
        filterOrderForLoggedUser,
        getAllOrders
    )

router.route('/:id')
    .post(
        autController.protected , 
        autController.allowedTo('user'), 
        getSpecificOrder
    )

module.exports = router;