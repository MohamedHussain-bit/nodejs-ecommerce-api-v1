const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const createToken = require('../utils/createToken');


exports.UploadUserImage = uploadSingleImage('profileImage');

exports.resizeImage = asyncHandler(async (req , res , next) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `user-${uniqueName}.jpeg`;
    if(req.file){
        await sharp(req.file.buffer)
        .resize(2000 , 1300)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`uploads/users/${filename}`)
    };
    req.body.profileImage = filename;
    next();
});

// @desc    Create user
// @route   POST /api/users
// @access  Private
exports.createUser = factory.createOne(User);

// @desc    Get list of user
// @route   GET /api/users
// @access  private
exports.getUsers = factory.getList(User);

// @desc    Get specific user by id
// @route   GET /api/users/:id
// @access  private
exports.getUser = factory.getOne(User);

// @desc    Update user by id
// @route   GET /api/users/:id
// @access  private
exports.updateUser = asyncHandler( async (req , res , next) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name : req.body.name,
            slug : req.body.slug,
            email : req.body.email,
            phone : req.body.phone,
            role : req.body.role,
            active : req.body.active,
            profileImage : req.body.profileImage,
        },
        {
            new : true
        }
    );
    if(!user){
        return next(new ApiError(`User for this id ${req.params.body} not found` , 400));
    };
    return res.status(200).json({data : user});
});

exports.changeUserPassword = asyncHandler( async (req , res , next) => {
    const userPassword = await User.findByIdAndUpdate(
        req.params.id,
        {
            password : await bcrypt.hash(req.body.password , 12),
            passwordChangedAt : Date.now()
        },
        {
            new : true
        }
    )
    if(!userPassword){
        return next(new ApiError(`User password for this id ${req.params.id} not found` , 400));
    };
    return res.status(200).json({data : userPassword});
});

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  private
exports.deleteUser = factory.deleteOne(User);

// @desc    Get logged user data
// @route   GET /api/users/getMe
// @access  private/protected
exports.getLoggedUserData = asyncHandler(async (req , res , next) => {
    req.params.id = req.user._id;
    next();
});

// @desc    Update logged user password
// @route   PUT /api/users/updateMyPassword
// @access  private/protected
exports.updateLoggedUserPassword = asyncHandler(async (req , res , next) => {
    // Update user password based payload
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            password : await bcrypt.hash(req.body.password , 12),
            passwordChangedAt : Date.now()
        },
        {
            new : true
        }
    );
    // Create token
    const token = createToken(user._id);
    res.status(200).json({data : user , token});
});

// @desc    Update logged user data
// @route   PUT /api/users/updateMyData
// @access  private/protected
exports.updateLoggedUserData = asyncHandler(async (req , res , next) => {
    const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
        },
        {
            new : true
        }
    );
    res.status(200).json({date : updateUser});
});

// @desc    Deactivate logged user
// @route   DELETE /api/users/DeleteMe
// @access  private/protected
exports.deleteLoggedUserData = asyncHandler(async (req , res , next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {active : false}
    );
    res.status(204).json({status : 'Success'});
});