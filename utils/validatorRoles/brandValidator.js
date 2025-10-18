const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage(`Name brand required`)
        .isLength({min : 5})
        .withMessage(`Too short brand name`)
        .isLength({max : 35})
        .withMessage(`Too long brand name`),
    validatorMiddleware    
];

exports.getBrand = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide brand Id`),
    validatorMiddleware    
];

exports.updateBrand = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide brand Id`),
    validatorMiddleware
];

exports.deleteBrand = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide brand Id`),
    validatorMiddleware    
];