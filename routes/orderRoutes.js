const express = require('express');

const {
    createCashOrder,
    getAllOrders,
    getSpecificOrder,
    filterOrderForLoggedUser,
    updateOrderToPaid,
    updateOrderToDilevered,
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
    .get(
        autController.protected, 
        autController.allowedTo('user' , 'admin' , 'manager'),
        filterOrderForLoggedUser,
        getAllOrders
    )

router.route('/:id')
    .get(
        getSpecificOrder
    )

router.route('/:id/pay')
    .put(
        autController.protected, 
        autController.allowedTo('admin' , 'manager'),
        updateOrderToPaid
    )

router.route('/:id/deliver')
    .put(
        autController.protected, 
        autController.allowedTo('admin' , 'manager'),
        updateOrderToDilevered
    )

module.exports = router;