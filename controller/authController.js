const crypto = require('crypto');

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

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

// check if user exist on system
exports.protected = asyncHandler(async (req , res , next) => {
    // check if token exist if exist get it
    let token;
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1];
    };
    if(!token){
        return next(new ApiError(
            `You are not login please login to get access this route`,
            401
        ));
    };
    // Verify token no change happend and expired
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
    // check if user exist
    const currentUser = await User.findById(decoded.userId);
    if(!currentUser){
        return next(new ApiError('The user thet belong to this token dose nolonger exist' , 401));
    };
    // check if user change password after token created
    if(currentUser.passwordChangedAt){
        const passwordChangedTimeStamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000 , 10
        );
        if(passwordChangedTimeStamp > decoded.iat){
            return next(new ApiError(`User recently changed his password please login agin` , 401));
        };
    };
    req.user = currentUser;
    next();
});

// user permissions
exports.allowedTo = (...roles) => {
    return asyncHandler(async (req , res , next) => {
        if(!roles.includes(req.user.role)){
            return next(new ApiError(`You are not access this route` , 403));
        };
        next();
    });
};

// @desc     Forget password
// @route    POST /api/auth/forgetPassword
// @access   public
exports.forgotPassword = asyncHandler(async (req , res , next) => {
    // Get user by email
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new ApiError(`ther is no user with that ${req.body.email}` , 404));
    };
    // Generate reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');
    // Save hached reset code on data base
    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 1000 * 60 * 10;
    user.passwordResetVerified = false;
    await user.save();
    // Create message to send the email from user
    const message = `Hi ${user.name},\n we received a request to reset the password
    on your E-Shop Account.\n Enter this code to complete the reset \n 
    Thanks E-Shop team`;
    // Send the email
    try{
        await sendEmail({
        email : user.email,
        subject : 'Your password reset code (valide for 10 min)',
        message,
    })
    }catch(err){
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;
        await user.save();
        return next(new ApiError(`Thir is an error to sending email`));
    };
    res.status(200).json({status : 'Success' , message : 'Eeset code send to email'});
});