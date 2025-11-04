const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/CategoryModel');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory');
const multer = require('multer');
const path = require('path')
const sharp = require('sharp');
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');

// DiskStorage engin
// const multerStorage = multer.diskStorage({
//     destination : (req , file , cb) => {
//         cb(null , 'uploads/categories');
//     },
//     filename : (req , file , cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = path.extname(file.originalname);
//         cb(null , uniqueSuffix + fileExtension);
//     }
// });

// Memory Storage engine
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req , file , cb) => {
//     if(file.mimetype.startsWith('image')){
//         cb(null , true);
//     } else {
//         cb(new ApiError('Only image allowed' , 400) , false);
//     };
// };

// const upload = multer({storage : multerStorage , fileFilter : multerFilter});

exports.uploadCategoryImage = uploadSingleImage('image');

exports.resizeImage = asyncHandler(async (req , res , next) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600 , 600)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`uploads/categories/${filename}`)

    req.body.image = filename;
    next();
});

// @desc      Create category
// @route     POST /api/categories
// @access    Private
// exports.createCategory = asyncHandler(async (req , res) => {
//     const {name} = req.body;
//     const newCategory = await Category.create({
//         name,
//         slug : slugify(name)
//     });
//     return res.status(201).json({ category : newCategory});
// });
exports.createCategory = factory.createOne(Category);

// @desc     Get categories
// @route    GET /api/categories
// @access   Public
// exports.getCategories = asyncHandler(async (req , res) => {
//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit *1 || 5;
//     // const skip = (page - 1) * limit;
//     // const categories = await Category.find({}).skip(skip).limit(limit);
//         const documentCounts = await Category.countDocuments()
//         const apiFeatures = new ApiFeatures(Category.find() , req.query)
//             .paginate(documentCounts)
//             .filter()
//             .limitFildes()
//             .search()
//             .sort()

//         const {paginationResult , mongooseQuery} = apiFeatures
//         const categories = await mongooseQuery;
//     return res.status(200).json({results : categories.length, paginationResult , data : categories});
// });
exports.getCategories = factory.getList(Category);

// @desc     Get specific category
// @route    POST /api/categories/:id
// @access   Private
// exports.getCategory = asyncHandler(async (req , res , next) => {
//     const {id} = req.params;
//     const category = await Category.findById(id);
//     if(!category){
//         // return res.status(404).json({message : `Category for this id ${id} not found`});
//         return next(new ApiError(`Category for this id ${id} not found` , 404));
//     };
//     return res.status(200).json({data : category});
// });
exports.getCategory = factory.getOne(Category);

// @desc     Update specific category
// @route    PUT /api/categories/:id
// @access   Private
// exports.updateCategory = asyncHandler(async (req , res , next) => {
//     const {id} = req.params;
//     const {name} = req.body;
//     const category = await Category.findByIdAndUpdate(
//         {_id : id},
//         {name , slug : slugify(name)}, 
//         {new : true});
//     if(!category){
//         // return res.status(404).json({message : `Catgory for this id ${id} not found`});
//         return next(new ApiError(`Catgory for this id ${id} not found` , 404));
//     };
//     return res.status(200).json({
//         message : `Category for this id ${id} updated successfully`,
//         date : category
//     });
// });
exports.updateCategory = factory.updateOne(Category);

// @desc     Delete specific category
// @route    DELETE /api/categories/:id
// @access   Private
// exports.deleteCategory = asyncHandler(async (req , res , next) => {
//     const {id} = req.params;
//     const category = await Category.findByIdAndDelete(id);
//     if(!category){
//         // return res.status(404).json({message : `Category for this id ${id} not found`});
//         return next(new ApiError(`Category for this id ${id} not found` , 404));
//     };
//     return res.status(204).json({
//         message : `Category for this id deleted successfully`
//     });
// });
exports.deleteCategory = factory.deleteOne(Category);