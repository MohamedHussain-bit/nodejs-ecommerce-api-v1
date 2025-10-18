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