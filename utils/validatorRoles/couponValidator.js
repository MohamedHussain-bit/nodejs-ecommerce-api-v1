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
    validatorMiddleware
];