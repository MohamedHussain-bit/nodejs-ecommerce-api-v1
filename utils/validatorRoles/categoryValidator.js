const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const { default: slugify } = require('slugify');

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name required')
        .isLength({min : 5})
        .withMessage('Too short category name')
        .isLength({max : 35})
        .withMessage('Too long category name')
        .custom((value , {req}) => {
            req.body.slug = slugify(value);
            return true;
        }),
    validatorMiddleware
];

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalied category id'),
    validatorMiddleware
];

exports.updateCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalied category id'),
    body('name')
        .custom((value , {req}) => {
            req.body.slug = slugify(value);
            return true;
        }),   
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalied category id'),
    validatorMiddleware
];