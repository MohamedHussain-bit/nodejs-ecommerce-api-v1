const asyncHandler = require('express-async-handler');

const Cart = require('../controller/cartController');
const Product = require('../controller/productController');
const ApiError = require('../utils/apiError');

// @desc     Add product to cart
// @route    POST /api/cart
// @access   Protected/user
exports.addProductToCart = asyncHandler(async (req , res , next) => {
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