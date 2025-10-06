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
    const categories = await CategoryModel.find({});
    return res.status(200).json({results : categories.length, data : categories});
});