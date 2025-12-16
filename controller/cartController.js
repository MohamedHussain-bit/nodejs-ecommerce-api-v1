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
    await cart.save();
});