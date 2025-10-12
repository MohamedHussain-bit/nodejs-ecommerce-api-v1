const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalied category id'),
    validatorMiddleware
];

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