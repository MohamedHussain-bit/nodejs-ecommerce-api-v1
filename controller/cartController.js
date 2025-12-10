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
        console.log('This is cart');
    };
});