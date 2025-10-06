const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/CategoryModel');

// @desc      Create category
// @route     POST /api/categories
// @access    Private
exports.createCategory = asyncHandler(async (req , res) => {
    const {name} = req.body;
    const newCategory = await CategoryModel.create({
        name,
        slug : slugify(name)
    });
    return res.status(201).json({ category : newCategory});
});

// @desc     Get category
// @route    GET /api/categories
// @access   Public
exports.getCategories = asyncHandler(async (req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit *1 || 5;
    const skip = (page - 1) * limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    return res.status(200).json({results : categories.length, data : categories});
});