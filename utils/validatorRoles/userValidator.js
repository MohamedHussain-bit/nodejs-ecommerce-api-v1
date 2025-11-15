const {check , body} = require('express-validator');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../../models/userModel');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({min : 3})
        .withMessage('Too short user name')
        .trim()
        .custom((value , {req}) => {
            if(!req.body.slug){
                req.body.slug = slugify(value , {lower : true});
            };
            return true;
        }),
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalide email address')
        .custom(asyncHandler( async (value) => {
            const user = await User.findOne({email : value});
            if(user){
                throw new Error(`Email already in use`);
            }
            return true;
        })),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password Confirm required'),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({min : 6})
        .withMessage('Password must be at least 6 characters')
        .custom((password , {req}) => {
            if(password !== req.body.passwordConfirm){
                throw new Error('Password confirm incorrect');
            };
            return true;
        }),
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG' , 'ar-SA'])
        .withMessage('Invalide phone number only accepted Egypt and SA phone number'),
    check('profileImage')
        .optional(),
    check('role')
        .optional(),
    validatorMiddleware
];

exports.getUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    validatorMiddleware
];

exports.updateUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    body('name')
        .optional()
        .custom((value , {req}) => {
            if(req.body.name){
                req.body.name = slugify(value , {lower : true});
                return true;
            };
        }),
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalide email address')
        .custom(asyncHandler( async (value) => {
            const user = await User.findOne({email : value});
            if(user){
                throw new Error(`Email already in use`);
            }
            return true;
        })),
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG' , 'ar-SA'])
        .withMessage('Invalide phone number only accepted Egypt and SA phone number'),
    check('profileImage')
        .optional(),
    check('role')
        .optional(),
    validatorMiddleware
];

exports.changeUserPasswordValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    body('currentPassword')
        .notEmpty()
        .withMessage('You must entry your current password'),
    body('newPasswordConfirm')
        .notEmpty()
        .withMessage('You must enter new password confirm'),
    check('newPassword')
        .notEmpty()
        .withMessage('You must enter new password')
        .custom( asyncHandler( async(value , {req}) => {
            // Verify current password
            const user = await User.findById(req.params.id);
            if(!user){
                throw new Error('Not found user for this id');
            };
            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            );
            if(!isCorrectPassword){
                throw new Error('Not correct current password');
            };

            // verify new password confirm
            if(value !== req.body.newPasswordConfirm){
                throw new Error('New password confirm not correct');
            };
        return true;
        })),
    validatorMiddleware
];

exports.deleteUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    validatorMiddleware
];