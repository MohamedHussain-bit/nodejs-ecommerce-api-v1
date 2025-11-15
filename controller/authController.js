const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

exports.signUp = asyncHandler( async (req , res , next) => {
    // create user
    const user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
    });
    // Generate token
    const token = jwt.sign(
        {userId : user._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn : process.env.JWT_EXPIRE_TIME}
    );
    res.status(201).json({data : user , token});
});