const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// @desc     Create Review
// @route    POST /api/reviews
// @access   Private / user
exports.createReview = factory.createOne(Review);