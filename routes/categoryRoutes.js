const multer = require('multer');
const express = require('express');
const {
        getCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator,
        createCategoryValidator
} = require('../utils/validatorRoles/categoryValidator');
const {
        createCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory
    } = require('../controller/categoryController');

const upload = multer({dest : 'uploads/categories'});

const subCategoriesRoute = require('./subCategoryRoutes');    

const router = express.Router();

router.use('/:categoryId/subCategories' , subCategoriesRoute)

router.route('/')
    .post(upload.single('image'),
    (req , res , next) => {
        console.log(req.file);
        next();
    }
    ,createCategoryValidator , createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategoryValidator , getCategory)
    .put(updateCategoryValidator , updateCategory)
    .delete(deleteCategoryValidator , deleteCategory)

module.exports = router;