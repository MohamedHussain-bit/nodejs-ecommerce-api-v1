const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name required')
        .isLength({min : 5})
        .withMessage('Too short category name')
        .isLength({max : 35})
        .withMessage('Too long category name'),
    validatorMiddleware
];

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalied category id'),
    validatorMiddleware
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalied category id'),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalied category id'),
    validatorMiddleware
];