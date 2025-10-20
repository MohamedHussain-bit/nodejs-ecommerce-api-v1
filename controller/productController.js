const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

// @desc     Create product
// @route    POST /api/products
// @access   Private
exports.CreateProduct = asyncHandler( async (req , res) => {
    req.body.slug = slugify(req.body.title);
    const product = await Product.create(req.body);
    return res.status(201).json({data : product});
});

// @desc     Create product
// @route    POST /api/products
// @access   Private
exports.getProducts = asyncHandler( async (req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit
    const product = await Product.find({}).skip(skip).limit(limit);
    return res.status(200).json({results : product.length, page, date : product});
});