const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// @desc     Create Review
// @route    POST /api/reviews
// @access   Private / user
exports.createReview = factory.createOne(Review);

// @desc     Get Reviews
// @route    GET /api/reviews
// @access   Public
exports.getReviews = factory.getList(Review);

// @desc     Get specific Review
// @route    GET /api/reviews/:id
// @access   Private / user
exports.getReview = factory.getOne(Review);

// @desc     Update Review
// @route    PUT /api/reviews/:id
// @access   Private / user
exports.updateReview = factory.updateOne(Review);

// @desc     Delete Review
// @route    POST /api/reviews/:id
// @access   Private / Admin , manager
exports.deleteReview = factory.deleteOne(Review);