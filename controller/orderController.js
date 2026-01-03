const asyncHandler = require('express-async-handler');

const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const ApiError = require('../utils/apiError');
const factory = require('./handlerFactory');

// @desc     Create order
// @route    POST /api/orders/cartId
// @access   Protected/User
exports.createCashOrder = asyncHandler(async (req , res , next) => {
    const taxPrice = 0;
    const shippingPrice = 0;
    // Get cart depend on cartId
    const cart = await Cart.findById(req.params.cartId);
    if(!cart){
        return next(new ApiError(`Cart for this id ${req,params.cartId} not found` , 404));
    };
    // Get order price depend on cart price and check if coupon apply
    const cartPrice = cart.totalCartPriceAfterDiscount ? 
        cart.totalCartPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
    // create order with default payment method type 'cash'
    const order = await Order.create({
        user : req.user._id,
        cartItems : cart.cartItems,
        shippingAddress : req.body.shippingAddress,
        totalOrderPrice,
    });
});