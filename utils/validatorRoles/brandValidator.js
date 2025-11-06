const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const { default: slugify } = require('slugify');

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage(`Name brand required`)
        .isLength({min : 5})
        .withMessage(`Too short brand name`)
        .isLength({max : 35})
        .withMessage(`Too long brand name`)
        .custom((value , {req}) => {
            req.body.slug = slugify(value);
            return true;
        }),
    validatorMiddleware    
];

exports.getBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide brand Id`),
    validatorMiddleware    
];

exports.updateBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide brand Id`),
    body('name')
        .optional()
        .custom((value , {req}) => {
            req.body.slug = slugify(value)
            return true;
        }),    
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide brand Id`),
    validatorMiddleware    
];