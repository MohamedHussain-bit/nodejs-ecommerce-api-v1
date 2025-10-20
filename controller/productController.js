const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

// @desc     Create product
// @route    POST /api/products
// @access   Private
exports.CreateProduct = asyncHandler( async (req , res , next) => {
    req.body.slug = slugify(req.body.title);
    const product = await Product.create(req.body);
    return res.status(201).json({data : product});
});