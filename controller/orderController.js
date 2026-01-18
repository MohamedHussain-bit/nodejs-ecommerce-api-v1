const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

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

// @desc     Update order paid status
// @route    PUT /api/orders/:id/pay
// @access   Protected/admin-manger
exports.updateOrderToPaid = asyncHandler(async (req , res , next) => {
    // Get order based on id
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ApiError(`not found order for this id ${req.params.id}` , 404));
    };
    // Update order to paid
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json({status : 'Success' , data : updatedOrder});
});

// @desc     Update order delivered status
// @route    PUT /api/orders/:id/deliver
// @access   Protected/admin-manger
exports.updateOrderToDilevered = asyncHandler(async (req , res , next) => {
    // Get order based on id
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ApiError(`not found order for this id ${req.params.id}` , 404));
    };
    // Update order to paid
    order.isDelivered = true;
    order.deliverdAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json({status : 'Success' , data : updatedOrder});
});

// @desc     Get checkout session from stripe and send it as response
// @route    GET/api/orders/checkout-session/:cartId
// @access   Protected/admin-manger
exports.checkoutSession = asyncHandler(async (req, res, next) => {
    const taxPrice = 0;
    const shippingPrice = 0;

    // 1- Get cart
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
        return next(
            new ApiError(`not found cart for this id ${req.params.cartId}`, 404)
    );
    }

    // 2- Calculate price
    const cartPrice = cart.totalCartPriceAfterDiscount
        ? cart.totalCartPriceAfterDiscount
        : cart.totalCartPrice;

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

    // 3- Create Stripe session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',

        line_items: [
        {
            price_data: {
                currency: 'egp',
                product_data: {
                name: 'Order payment',
                },
            unit_amount: totalOrderPrice * 100,
            },
            quantity: 1,
        },
    ],

        customer_email: req.user.email,
        client_reference_id: cart._id.toString(),

        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,

        metadata: {
        userId: req.user._id.toString(),
        },
    });

    // 4- Response
    res.status(200).json({
    status: 'success',
    session,
    });
});