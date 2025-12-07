const factory = require('./handlerFactory');

const Coupon = require('../models/couponModel');

// @desc     Create coupon
// @route    POST /api/coupon
// @access   Private/admin , manager
exports.createCoupon = factory.createOne(Coupon);

// @desc     Get list of coupon
// @route    GET /api/coupon
// @access   Private/admin , manager
exports.getCoupons = factory.getList(Coupon);