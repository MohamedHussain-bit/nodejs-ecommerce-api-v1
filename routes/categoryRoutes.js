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
        deleteCategory,
        uploadCategoryImage
    } = require('../controller/categoryController');

const subCategoriesRoute = require('./subCategoryRoutes');    

const router = express.Router();

router.use('/:categoryId/subCategories' , subCategoriesRoute)

router.route('/')
    .post(uploadCategoryImage ,createCategoryValidator , createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategoryValidator , getCategory)
    .put(updateCategoryValidator , updateCategory)
    .delete(deleteCategoryValidator , deleteCategory)

module.exports = router;