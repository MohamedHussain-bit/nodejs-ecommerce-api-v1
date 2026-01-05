const asyncHandler = require('express-async-handler');

const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
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
    // After creating order decrement product quantity increment product sold
    if(order){
        const bulkOptions = cart.cartItems.map((item) => ({
        updateOne : {
            filter : { _id : item.product },
            update : { $inc : {quantity : -item.quantity , sold : item.quantity}}
        }
        }));
        await Product.bulkWrite(bulkOptions , {});
        // Clear cart depend on cartId
        await Cart.findByIdAndDelete(req.params.cartId);
    };
    res.status(201).json({
        status : 'Success',
        data : order
    });
});

exports.filterOrderForLoggedUser = asyncHandler(async(req , res , next) => {
    if(req.user.role === 'user') req.filterObj = {user : req.user._id};
    next();
});

// @desc     Get all orders
// @route    POST /api/orders
// @access   Protected/User-admin-manger
exports.getAllOrders = factory.getList(Order);

// @desc     Get specific orders
// @route    POST /api/orders
// @access   Protected/User-admin-manger
exports.getSpecificOrder = factory.getOne(Order);