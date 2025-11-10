const {check , body} = require('express-validator');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

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
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({min : 6})
        .withMessage('Too short password'),
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG' , 'ar-SA']),
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
    validatorMiddleware
];

exports.deleteUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    validatorMiddleware
];