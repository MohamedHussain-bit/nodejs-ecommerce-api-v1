const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

const createToken = (payload) => {
    return jwt.sign(
        {userId : payload},
        process.env.JWT_SECRET_KEY,
        {expiresIn : process.env.JWT_EXPIRE_TIME},
    );
};

// @desc     Signup
// @route    POST /api/auth/signup
// @access   Public
exports.signup = asyncHandler( async (req , res , next) => {
    // create user
    const user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    });
    // Generate token
    const token = createToken(user._id);
    res.status(201).json({data : user , token});
});

// @desc     Login
// @route    POST /api/auth/login
// @access   public
exports.login = asyncHandler(async (req , res , next) => {
    // Check if user exist and check if password correct
    const user = await User.findOne({email : req.body.email});
    if(!user || !(await bcrypt.compare(req.body.password , user.password))){
        return next(new ApiError(`Incorrect email or password` , 401));
    };
    // Generate token
    const token = createToken(user._id);
    res.status(200).json({data : user , token});
});