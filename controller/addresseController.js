const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc     Add address to user addreses list
// @route    POST /api/addresses
// @access   Protected/user
exports.addAddress = asyncHandler(async (req , res , next) => {
    // $addToSet => to add address to user addresses list
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet : {addresses : req.body}
        },
        {
            new : true
        }
    );
    res.status(200).json({
        status : 'Success',
        message : 'Address added to success',
        data : user.addresses
    });
});

// @desc     Remove address from user addreses list
// @route    DELETE /api/addresses/:addressId
// @access   Protected/user
exports.removeAddress = asyncHandler(async (req , res , next) => {
    // $pull => to remove address from addresses list
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull : {addresses : {_id : req.params.addressId}}
        },
        {
            new : true
        }
    );
    res.status(200).json({
        status : 'Success',
        message : 'Address removed successfully',
        data : user.addresses
    });
});

// @desc     Get user addreses list
// @route    GET /api/addresses
// @access   Protected/user
exports.getLoggedUserAddresses = asyncHandler(async (req , res ,next) => {
    const user = await User.findById(req.user._id).populate('addresses');

    res.status(200).json({
        status : 'Success',
        result : user.addresses.length,
        data : user.addresses
    });
});