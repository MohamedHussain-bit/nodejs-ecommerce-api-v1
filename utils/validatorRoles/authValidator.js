const slugify = require('slugify');
const {check} = require('express-validator');

const User = require('../../models/userModel');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.signupValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name user required')
        .isLength({min : 6})
        .withMessage('Too short user name')
        .trim()
        .custom((value , {req}) => {
            if(!req.body.slug){
                req.body.slug = slugify(value , {lower : true});
            };
            return true;
        }),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirm required'),
    check('password')
        .notEmpty()
        .withMessage('User password required')
        .isLength({min : 6})
        .withMessage('User password at least 6 chractares')
        .custom((password , {req}) => {
            if(password !== req.body.passwordConfirm){
                throw new Error('Password confirm not correct')
            }
            return true;
        }),
    check('email')
        .notEmpty()
        .withMessage('User email required')
        .isEmail()
        .withMessage('Invalide email address')
        .custom(async (value) => {
            const user = await User.findOne({email : value});
            if(user){
                throw new Error('Email alreade in use')
            }
            return true;
        }),
    validatorMiddleware
];