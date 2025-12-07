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

// @desc     Get specific of coupon
// @route    GET /api/coupon/:Id
// @access   Private/admin , manager
exports.getCoupon = factory.getOne(Coupon);

// @desc     Update coupon
// @route    PUT /api/coupon/:Id
// @access   Private/admin , manager
exports.updateCoupon = factory.updateOne(Coupon);

// @desc     Delete coupon
// @route    DELETE /api/coupon/Id
// @access   Private/admin , manager
exports.deleteCoupon = factory.deleteOne(Coupon);