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