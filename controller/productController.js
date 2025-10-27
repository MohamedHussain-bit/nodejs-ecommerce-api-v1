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
    // Filtration
    const queryStringObj = {...req.query};
    const excludesFields = ['page' , 'limit' , 'sort'];
    excludesFields.forEach((fild) => delete queryStringObj[fild]);
    let queryString = JSON.stringify(queryStringObj);
    queryString = queryString.replace(/\b(gte | gt | lte | lt)\b/g , (match) => {
        `$${match}`
    });
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit
    // Build query
    let mongooseQuery = Product.find(JSON.parse(queryString)).skip(skip).limit(limit).populate({
        path : 'category',
        select : 'name -_id'
    });
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        mongooseQuery = mongooseQuery.sort(sortBy);
    }else {
        mongooseQuery = mongooseQuery.sort('-createdAt')
    };

    if(req.query.filds){
        const filds = req.query.filds.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(filds);
    }else{
        mongooseQuery = mongooseQuery.select('-__v');
    };

    if(req.query.keyWord){
        const query = {};
        query.$or = [
            {title : {$regex : req.query.keyWord , $options : 'i'}},
            {description : {$regex : req.query.keyWord , $options : 'i'}}
        ]
    };
    // Execute query
    const products = await mongooseQuery;
    return res.status(200).json({results : products.length, page, date : products});
});

// @desc     Get specific product
// @route    GET /api/products/:id
// @access   Public
exports.getProduct = asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const product = await Product.findById({_id : id}).populate({
        path : 'category',
        select : 'name -_id'
    });
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
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    };
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