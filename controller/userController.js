const asyncHandler = require('express-async-handler');
const sharp = require('sharp');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const User = require('../models/userModel');
const factory = require('./handlerFactory');


exports.UploadUserImage = uploadSingleImage('profileImage');

exports.resizeImage = asyncHandler(async (req , res , next) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `user-${uniqueName}.jpeg`;
    
    await sharp(req.file.buffer)
        .resize(2000 , 1300)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`uploads/users/${filename}`)

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
exports.updateUser = factory.updateOne(User);

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  private
exports.deleteUser = factory.deleteOne(User);