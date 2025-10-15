const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const ApiError = require('../utils/apiError');

// @desc     Create subCategories
// @route    POST /api/subCategories
// @access   Private       
exports.createSubCategory = asyncHandler( async (req , res) => {
    const {name , category} = req.body;
    const subCategory = await SubCategory.create({
        name,
        slug : slugify(name),
        category
    });
    return res.status(201).json({ data : subCategory});
});

// @desc     Get all subCategories
// @route    GET /api/subCategories
// @access   Public
exports.getSubCategories = asyncHandler( async (req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
    return res.status(200).json({result : subCategories.length , data : subCategories});
});

// @desc     Get specific subCategory
// @route    GET /api/subCategories
// @access   Private 
exports.getSubCategory = asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const subCategory = await SubCategory.find(id);
    if(!subCategory){
        return next(new ApiError(`SubCategory for this id ${id} not found` , 404));
    }
    return res.status(200).json({data : subCategory})
});