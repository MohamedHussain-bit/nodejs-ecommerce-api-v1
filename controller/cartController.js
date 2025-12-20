const asyncHandler = require('express-async-handler');

const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

// @desc     Add product to cart
// @route    POST /api/cart
// @access   Protected/user
exports.addProductToCart = asyncHandler(async (req , res , next) => {
    // Get cart for logged user
    let cart = await Cart.findOne({user : req.user._id});
    const product = await Product.findById(req.body.product)
    if(!cart){
        // create cart for logged user with product
        cart = await Cart.create({
            user : req.user._id,
            cartItems : [{
                product : req.body.product,
                color : req.body.color,
                price : product.price,
            }]
        });
    } else {
        // Product exist in cart , update product qountity
        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === req.body.product 
            &&
            item.color === req.body.color
            )
            if(productIndex > -1){
                const cartItem = cart.cartItems[productIndex];
                cartItem.quantity += 1;
                cart.cartItems[productIndex] = cartItem;
            } else {
                // Product not exist in cart , push product to cart
                cart.cartItems.push({
                    product : req.body.product,
                    color : req.body.color,
                    price : product.price,
                });
            };
    };
    // Calculate total cart price
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice = totalPrice + item.quantity * item.price;
    })
    cart.totalCartPrice = totalPrice;
    await cart.save();
    res.status(200).json({
        status : 'Success',
        message : 'Product added to cart successfully',
        data : cart
    });
});

// @desc     Get logged user cart
// @route    GET /api/cart
// @access   Protected/user
exports.getLoggedUserCart = asyncHandler(async (req , res , next) => {
    const cart = await Cart.findOne({user : req.user._id});
    if(!cart){
        return next(new ApiError(`There is no cart for this user id ${req.user._id}` , 404));
    };
    res.status(200).json({
        status : 'Success',
        numOfCartItems : cart.cartItems.length,
        data : cart,
    });
});

// @desc     Remove specific cart item
// @route    DELETE /api/cart/:itemId
// @access   Protected/user
exports.removeSpecificCartItem = asyncHandler(async (req , res , next) => {
    const cart = await Cart.findOneAndUpdate(
        {user : req.user._id},
        {
            $pull : {cartItems : { _id : req.params.itemId }}
        },
        {
            new : true
        }
    );
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice = totalPrice + item.price * item.quantity;
    });
    cart.totalCartPrice = totalPrice;
    await cart.save();
    res.status(200).json({
        status : 'success',
        numOfCartItems : cart.cartItems.length,
        data : cart
    });
});

// @desc     Clear logged user cart
// @route    DELETE /api/cart
// @access   Protected/user
exports.clearLoggedUserCart = asyncHandler(async (req , res , next) => {
    const cart = await Cart.findOneAndDelete({
        user : req.user._id
    });
    if(!cart){
        return next(new ApiError(`Not found cart for this user` , 404));
    };
    res.status(204).json({message : `deleted successfully`});
});