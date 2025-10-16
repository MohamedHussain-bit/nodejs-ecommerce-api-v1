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
        .notEmpty()
        .withMessage('SubCategory must be belong to parent category')
        .isMongoId()
        .withMessage('Invalide subCategory id'),
    validatorMiddleware    
];

exports.getSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide subCategory id`),
    validatorMiddleware    
];

exports.updateSubCategoyValidator = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide SubCategory id`),
    check('category') 
        .isMongoId()
        .withMessage(`Category id required`),
    validatorMiddleware    
];

exports.deleteSubCtegoryValidator = [
    check('id')
        .isMongoId()
        .withMessage(`Invalide subCategory id`),
    validatorMiddleware
];