const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const factory = require('./handlerFactory');


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
            password : bcrypt.hash(req.body.password)
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