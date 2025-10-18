const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Brand = require('../models/brandModel');

// @desc     Create Brand
// @route    POST /api/brands
// @access   Private
exports.createBrand = asyncHandler( async (req , res) => {
    const {name} = req.body;
    const brand = await Brand.create({
        name,
        slug : slugify(name)
    });
    return res.status(201).json({brand : brand});
});

// @desc     Get all Brand
// @route    GET /api/brands
// @access   Buplic
exports.getBrands = asyncHandler( async (req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit *1 || 5;
    const skip = (page - 1) * limit;

    const brands = await Brand.find({}).skip(skip).limit(limit);
    return res.status(200).json({results : brands.length , data : brands});
});