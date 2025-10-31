const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/CategoryModel');
const SubCategory = require('../../models/subCategoryModel');
const { default: slugify } = require('slugify');

exports.createProductValidation = [
    check('title')
        .notEmpty()
        .withMessage('Title product is required')
        .trim()
        .isLength({min : 3})
        .withMessage('Too short title product')
        .isLength({max : 30})
        .withMessage('Too long product title')
        .custom((value , {req}) => {
            req.body.slug = slugify(value);
            return true;
        }),
    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({min : 100})
        .withMessage('Too short product description'),
    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Product quantity must be number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('product sold must be a number'),
    check('price') 
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number')
        .isLength({max : 100000})
        .withMessage('Too long product price'),
    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .isFloat()
        .custom((value , {req}) => {
            if(req.body.price <= value){
                throw new Error('PriceAfterDiscount must be lower than prise');
            };
            return true;
        }),
    check('colors')
        .optional()
        .toArray(),
    check('imageCover')
        .notEmpty()
        .withMessage('Product image cover must be required'),
    check('images')
        .optional()
        .toArray(),
    check('category')
        .notEmpty()
        .withMessage('Product must be belong to category')
        .isMongoId()
        .withMessage('Product category invalide Id')
        .custom((categoryId) => Category.findById(categoryId).then((category) => {
            if(!category){
                return Promise.reject(new Error(`No category for this id ${categoryId}`))
            };
        })),
    check('subCategories')
        .optional()
        .isArray()
        .withMessage('Product supCategory must be array Id'),
    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Product prand invalide id'),
    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('Product ratingsAverage must be number')
        .isLength({min : 1})
        .withMessage('Rating must be above or equale 1.0')
        .isLength({max : 5})
        .withMessage('Rating must be below or equale 5.0'),
    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('Product ratingsQuantity must be number'),
    validatorMiddleware
];

exports.getProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id format'),
    validatorMiddleware
];

exports.updateProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id format'),
    body('title')
        .custom((value , {req}) => {
            req.body.slug = slugify(value);
            return true;
        }),
    validatorMiddleware
];

exports.deleteProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id format'),
    validatorMiddleware
];