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
        uploadCategoryImage,
        resizeImage
    } = require('../controller/categoryController');

const authController = require('../controller/authController');

const subCategoriesRoute = require('./subCategoryRoutes');    

const router = express.Router();

router.use('/:categoryId/subCategories' , subCategoriesRoute)

router.route('/')
    .post(authController.protected ,
        authController.allowedTo('admin' , 'manager') ,
        uploadCategoryImage , resizeImage ,createCategoryValidator , createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategoryValidator , getCategory)
    .put(uploadCategoryImage, resizeImage ,updateCategoryValidator , updateCategory)
    .delete(deleteCategoryValidator , deleteCategory)

module.exports = router;