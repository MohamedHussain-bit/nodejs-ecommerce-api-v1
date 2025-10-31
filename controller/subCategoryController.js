const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory');

// Nested route to create subCategory from category
exports.setCategoryIdToBody = asyncHandler(async (req , res , next) =>{
    if(!req.body.category) req.body.category = req.params.categoryId;
    next();
}); 

// @desc     Create subCategories
// @route    POST /api/subCategories
// @access   Private       
// exports.createSubCategory = asyncHandler( async (req , res) => {
//     const {name , category} = req.body;
//     const subCategory = await SubCategory.create({
//         name,
//         slug : slugify(name),
//         category
//     });
//     return res.status(201).json({ data : subCategory});
// });
exports.createSubCategory = factory.createOne(SubCategory);

// Nested Route
// GET /api/categories/:categoryId/subCategry
exports.createFilterObject = asyncHandler( async (req , res , next) => {
    let filterObject = {};
    if(req.params.categoryId) filterObject = {category : req.params.categoryId};
    req.filterObj = filterObject;
    next();
});

// @desc     Get all subCategories
// @route    GET /api/subCategories
// @access   Public
exports.getSubCategories = asyncHandler( async (req , res) => {
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 5;
    // const skip = (page - 1) * limit;
    // const subCategories = await SubCategory.find(req.filterObj).skip(skip).limit(limit);
    const documentCounts = await SubCategory.countDocuments()
    const apiFeatures = new ApiFeatures(SubCategory.find() , req.query)
        .paginate(documentCounts)
        .filter()
        .limitFildes()
        .search()
        .sort()
        
    const {paginationResult , mongooseQuery} = apiFeatures
    const subCategories = await mongooseQuery;
    return res.status(200).json({result : subCategories.length ,paginationResult , data : subCategories});
});

// @desc     Get specific subCategory
// @route    GET /api/subCategories/id
// @access   Private 
exports.getSubCategory = asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const subCategory = await SubCategory.find({_id : id});
    if(!subCategory){
        return next(new ApiError(`SubCategory for this id ${id} not found` , 404));
    }
    return res.status(200).json({data : subCategory})
});

// @desc     Update SubCategry
// @route    PUT /api/subCategories/id
// @access   Private
// exports.updateSubCategory = asyncHandler( async (req , res , next) => {
//     const {id} = req.params;
//     const {name , category} = req.body;
//     const subCategory = await SubCategory.findByIdAndUpdate(
//         {_id : id},
//         {name , slug : slugify(name) , category},
//         {new : true}
//     );
//     if(!subCategory){
//         return next(new ApiError(`SubCategory for this id ${id} not found` , 404));
//     };
//     return res.status(200).json({data : subCategory});
// });
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete SubCategory
// @route   DELETE /api/subCategories/:id
// @access  Private
// exports.deleteSubCategory = asyncHandler( async (req , res ,next) => {
//     const {id} = req.params;
//     const subCategory = await SubCategory.findByIdAndDelete({_id : id});
//     if(!subCategory){
//         return next(new ApiError(`This SubCategory not found`));
//     };
//     return res.status(200).json({message : `SubCategory for this id deleted successfully`});
// });
exports.deleteSubCategory = factory.deleteOne(SubCategory);