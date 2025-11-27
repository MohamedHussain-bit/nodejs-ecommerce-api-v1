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
// @route    POST /api/reviews
// @access   Private / user
exports.getReview = factory.getOne(Review);