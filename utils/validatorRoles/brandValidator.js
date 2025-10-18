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