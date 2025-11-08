const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req , file , cb) => {
//     if(file.mimetype.startsWith('image')){
//         cb(null , true);
//     } else {
//         cb(new ApiError(`Only image allowed` , 400) , false);
//     };
// };

// const upload = multer({storage : multerStorage , fileFilter : multerFilter});

exports.uploadProductImages = uploadMixOfImages([
    {name : 'imageCover' , maxCount : 1},
    {name : 'images' , maxCount : 5}
]);

exports.resizeProductImage = asyncHandler(async (req , res , next) => {
    //console.log(req.files);
    // ImageCover processing
    if(req.files.imageCover){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const imageCoverFilename = `${uniqueSuffix}-cover.jpeg`;

        await sharp(req.files.imageCover[0].buffer)
            .resize(2000,1333)
            .toFormat('jpeg')
            .jpeg({quality : 90})
            .toFile(`uploads/products/${imageCoverFilename}`)

            req.body.imageCover = imageCoverFilename;
    };
    // Images pocessing
    if(req.files.images){
        req.body.images = [];
        await Promise.all(
            req.files.images.map( async (images , index) => {
                const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 1E9);
                const imagesName = `${uniqueSuffix}-${index + 1}.jpeg`;

                await sharp(images.buffer)
                    .resize(2000 , 1333)
                    .toFormat('jpeg')
                    .jpeg({quality : 90})
                    .toFile(`uploads/products/${imagesName}`)
                    
                    req.body.images.push(imagesName)
            })
        )
        next()
    }
});

// @desc     Create product
// @route    POST /api/products
// @access   Private
// exports.CreateProduct = asyncHandler( async (req , res) => {
//     req.body.slug = slugify(req.body.title);
//     const product = await Product.create(req.body);
//     return res.status(201).json({data : product});
// });
exports.CreateProduct = factory.createOne(Product);

// @desc     Get list of product
// @route    GET /api/products
// @access   Public
// exports.getProducts = asyncHandler( async (req , res) => {
//     // Filtration
//     // const queryStringObj = {...req.query};
//     // const excludesFields = ['page' , 'limit' , 'sort'];
//     // excludesFields.forEach((fild) => delete queryStringObj[fild]);
//     // let queryString = JSON.stringify(queryStringObj);
//     // queryString = queryString.replace(/\b(gte | gt | lte | lt)\b/g , (match) => {
//     //     `$${match}`
//     // });

//     // pagination
//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 5;
//     // const skip = (page - 1) * limit
//     const documentCounts = await Product.countDocuments()
//     const apiFeatures = new ApiFeatures(Product.find() , req.query)
//         .paginate(documentCounts)
//         .filter()
//         .limitFildes()
//         .search('products')
//         .sort()

//     // Build query
//     // let mongooseQuery = Product.find(JSON.parse(queryString)).populate({
//     //     path : 'category',
//     //     select : 'name -_id'
//     // });

//     // sorting
//     // if(req.query.sort){
//     //     const sortBy = req.query.sort.split(',').join(' ')
//     //     mongooseQuery = mongooseQuery.sort(sortBy);
//     // }else {
//     //     mongooseQuery = mongooseQuery.sort('-createdAt')
//     // };

//     // limit filds
//     // if(req.query.filds){
//     //     const filds = req.query.filds.split(',').join(' ');
//     //     mongooseQuery = mongooseQuery.select(filds);
//     // }else{
//     //     mongooseQuery = mongooseQuery.select('-__v');
//     // };

//     // search
//     // if(req.query.keyWord){
//     //     const query = {};
//     //     query.$or = [
//     //         {title : {$regex : req.query.keyWord , $options : 'i'}},
//     //         {description : {$regex : req.query.keyWord , $options : 'i'}}
//     //     ]
//     // };
//     // Execute query
//     const {paginationResult , mongooseQuery} = apiFeatures
//     const products = await mongooseQuery;
//     return res.status(200).json({results : products.length , paginationResult , date : products});
// });
exports.getProducts = factory.getList(Product , 'Products');

// @desc     Get specific product
// @route    GET /api/products/:id
// @access   Public
// exports.getProduct = asyncHandler( async (req , res , next) => {
//     const {id} = req.params;
//     const product = await Product.findById({_id : id}).populate({
//         path : 'category',
//         select : 'name -_id'
//     });
//     if(!product){
//         return next(new ApiError(`Product for this id ${id} not found` , 404));
//     };
//     return res.status(200).json({data : product});
// });
exports.getProduct = factory.getOne(Product);

// @desc     Update specific product
// @route    UPDATE /api/products/:id
// @access   Private
// exports.updateProduct = asyncHandler( async (req , res , next) => {
//     const {id} = req.params;
//     if(req.body.title){
//         req.body.slug = slugify(req.body.title);
//     };
//     const product = await Product.findByIdAndUpdate(
//         {_id : id},
//         req.body,
//         {new : true},
//     );
//     if(!product){
//         return next(new ApiError(`Product for this id ${id} not found` , 404));
//     };
//     return res.status(200).json({
//         message : `Product for this id ${id} updated successfully`,
//         data :product,
//     });
// });
exports.updateProduct = factory.updateOne(Product);

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   Private
// exports.deleteProduct = asyncHandler( async (req , res , next) => {
//     const {id} = req.params;
//     const product = await Product.findByIdAndDelete({_id : id});
//     if(!product){
//         return next(new ApiError(`Product for this id not found` , 404));
//     };
//     return res.status(200).json({message : `Product for this id deleted successfully`});
// });
exports.deleteProduct = factory.deleteOne(Product);