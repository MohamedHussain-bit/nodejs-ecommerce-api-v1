const multer = require('multer');
const ApiError = require('../utils/apiError');

exports.uploadSingleImage = (fieldName) => {
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

//  Memory Storage engine
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req , file , cb) => {
        if(file.mimetype.startsWith('image')){
            cb(null , true);
        } else {
            cb(new ApiError('Only image allowed' , 400) , false);
        };
    };

    const upload = multer({storage : multerStorage , fileFilter : multerFilter});
    return upload.single(fieldName);
};