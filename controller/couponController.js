const factory = require('./handlerFactory');

const Coupon = require('../models/couponModel');

// @desc     Create coupon
// @route    POST /api/coupon
// @access   Prtcted/admin , manager
exports.createCoupon = factory.createOne(Coupon);