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