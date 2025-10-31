const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Brand = require('../models/brandModel');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory');

// @desc     Create Brand
// @route    POST /api/brands
// @access   Private
// exports.createBrand = asyncHandler( async (req , res) => {
//     const {name} = req.body;
//     const brand = await Brand.create({
//         name,
//         slug : slugify(name)
//     });
//     return res.status(201).json({brand : brand});
// });
exports.createBrand = factory.createOne(Brand);

// @desc     Get all Brand
// @route    GET /api/brands
// @access   Buplic
exports.getBrands = asyncHandler( async (req , res) => {
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit *1 || 5;
    // const skip = (page - 1) * limit;
    const documentCounts = await Brand.countDocuments()
    const apiFeatures = new ApiFeatures(Brand.find() , req.query)
        .paginate(documentCounts)
        .filter()
        .limitFildes()
        .search()
        .sort()

    const {paginationResult , mongooseQuery} = apiFeatures
    const brands = await mongooseQuery;
    // const brands = await Brand.find({}).skip(skip).limit(limit);
    return res.status(200).json({results : brands.length, paginationResult , data : brands});
});

// @desc     Get specific brand
// @route    GET /api/brands/:id
// @access   Bublic
// exports.getBrand = asyncHandler( async (req , res , next) => {
//     const {id} = req.params;
//     const brand = await Brand.findById(id);
//     if(!brand){
//         return next(new ApiError(`Brand for this id ${id} not found` , 404));
//     };
//     return res.status(200).json({data : brand});
// });
exports.getBrand = factory.getOne(Brand);

// @desc     Update specific brand
// @route    UPDATE /api/brands/:id
// @access   Private
// exports.updateBrand = asyncHandler( async (req , res , next) => {
//     const brand = await Brand.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new : true}
//     );
//     if(!brand){
//         return next(new ApiError(`Brand this id ${id} not found` , 404));
//     };
//     return res.status(200).json({data : brand});
// });
exports.updateBrand = factory.updateOne(Brand)

// @desc     Delete brand
// @route    DELETE /api/brands/:id
// @access   Private
// exports.deleteBrand = asyncHandler( async (req , res , next) => {
//     const {id} = req.params;
//     const brand = await Brand.findByIdAndDelete({_id : id});
//     if(!brand){
//         return next(new ApiError(`Brand this id not found` , 404));
//     };
//     return res.status(200).json({Message : `Brand for this id deleted successfully`});
// });
exports.deleteBrand = factory.deleteOne(Brand);