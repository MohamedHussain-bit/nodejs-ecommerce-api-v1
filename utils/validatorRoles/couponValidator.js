const {check} = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Coupon = require('../../models/couponModel');
const { Error } = require('mongoose');

exports.createCouponValidator = [
    check('name')
        .notEmpty()
        .withMessage('Coupon name required')
        .trim()
        .custom(async (value , {req}) => {
            const coupon = await Coupon.findOne({name : value});
            if(coupon){
                throw new Error('Coupon alredy exist');
            };
            return true;
        }),
    check('expire')
        .notEmpty()
        .withMessage('Coupon expire required')
        .toDate(),
    check('discount')
        .notEmpty()
        .withMessage('Coupon discount required')
        .isNumeric()
        .withMessage('Coupon must be number'),
    validatorMiddleware
];

exports.getSpecificCouponValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    validatorMiddleware
];

exports.updateCouponValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    check('name')
        .optional()
        .custom(async (value , {req}) => {
            const coupon = await Coupon.findOne({name : value});
            if(coupon){
                throw new Error('Coupon alredy exist');
            };
            return true;
        }),
    validatorMiddleware
];

exports.deleteCouponValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalide Id'),
    validatorMiddleware
];