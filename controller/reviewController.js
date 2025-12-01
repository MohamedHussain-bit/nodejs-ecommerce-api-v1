const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// @desc     Create Review
// @route    POST /api/reviews
// @access   Private / user
exports.createReview = factory.createOne(Review);

// Nested Route
// GET /api/categories/:categoryId/subCategry
exports.createFilterObject = asyncHandler( async (req , res , next) => {
    let filterObject = {};
    if(req.params.productId) filterObject = {product : req.params.productId};
    req.filterObj = filterObject;
    next();
});
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