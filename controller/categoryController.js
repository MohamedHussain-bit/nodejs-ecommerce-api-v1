const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/CategoryModel');

// @desc      Create category
// @route     POST /api/categories
// @access    Private
exports.createCategory = asyncHandler(async (req , res) => {
    const {name} = req.body;
    const newCategory = await Category.create({
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
    const categories = await Category.find({}).skip(skip).limit(limit);
    return res.status(200).json({results : categories.length, data : categories});
});

// @desc     Get specific category
// @route    POST /api/categories/:id
// @access   Private
exports.getCategory = asyncHandler(async (req , res) => {
    const {id} = req.params;
    const category = await Category.findById(id);
    if(!category){
        return res.status(404).json({message : `Category for this id ${id} not found`});
    };
    return res.status(200).json({data : category});
});

// @desc     Update specific category
// @route    PUT /api/categories/:id
// @access   Private
exports.updateCategory = asyncHandler(async (req , res) => {
    const {id} = req.params;
    const {name} = req.body;
    const category = await Category.findByIdAndUpdate(
        {_id : id},
        {name , slug : slugify(name)}, 
        {new : true});
    if(!category){
        return res.status(404).json({message : `Catgory for this id ${id} not found`});
    };
    return res.status(200).json({
        message : `Category for this id ${id} updated successfully`,
        date : category
    });
});

// @desc     Delete specific category
// @route    DELETE /api/categories/:id
// @access   Private
exports.deleteCategory = asyncHandler(async (req , res) => {
    const {id} = req.params;
    const category = await Category.findByIdAndDelete(id);
    if(!category){
        return res.status(404).json({message : `Category for this id ${id} not found`});
    };
    return res.status(204).json({
        message : `Category for this id deleted successfully`
    });
});