const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const ApiErorr = require('../utils/apiError');

// @desc     Add product to wishlist
// @route    POST /api/wishlist
// @access   Protected/user
exports.addProductToWishlist = asyncHandler(async (req , res , next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet : {wishList : req.body.productId}
        },
        {
            new : true
        }
    );
    res.status(200).json({
        status : 'Success',
        message : 'Product added successfully to your wishlist',
        data : user.wishList
    });
});

// @desc     Remove product from wishlist
// @route    DELETE /api/wishlist
// @access   Protected/user
exports.removeProductFromWishlist  = asyncHandler(async (req , res , next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull : {wishList : req.params.productId}
        },
        {
            new : true
        }
    );
    res.status(200).json({
        status : 'Success',
        message : 'Product removed successfully from your wishlist',
        data : user.wishList
    });
});