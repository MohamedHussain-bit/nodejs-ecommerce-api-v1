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

// @desc     Get list of product
// @route    GET /api/products
// @access   Public
exports.getProducts = asyncHandler( async (req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit
    const products = await Product.find({}).skip(skip).limit(limit);
    return res.status(200).json({results : products.length, page, date : products});
});

// @desc     Get specific product
// @route    GET /api/products/:id
// @access   Public
exports.getProduct = asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const product = await Product.findById({_id : id});
    if(!product){
        return next(new ApiError(`Product for this id ${id} not found` , 404));
    };
    return res.status(200).json({data : product});
});

// @desc     Update specific product
// @route    UPDATE /api/products/:id
// @access   Private
exports.updateProduct = asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    req.body.slug = slugify(req.body.title);
    const product = await Product.findByIdAndUpdate(
        {_id : id},
        req.body,
        {new : true},
    );
    if(!product){
        return next(new ApiError(`Product for this id ${id} not found` , 404));
    };
    return res.status(200).json({
        message : `Product for this id ${id} updated successfully`,
        data :product,
    });
});

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   Private
exports.deleteProduct = asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete({_id : id});
    if(!product){
        return next(new ApiError(`Product for this id not found` , 404));
    };
    return res.status(200).json({message : `Product for this id deleted successfully`});
});