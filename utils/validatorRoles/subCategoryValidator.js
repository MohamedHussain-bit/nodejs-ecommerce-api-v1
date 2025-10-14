const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory name required')
        .trim()
        .isLength({min : 5})
        .withMessage('Too short subCategory name')
        .isLength({max : 35})
        .withMessage('Too long subCategory name'),
    check('category')
        .isMongoId()
        .withMessage('Invalide subCategory id')
        .notEmpty()
        .withMessage('SubCategory must be belong to parent category'),
    validatorMiddleware    
];