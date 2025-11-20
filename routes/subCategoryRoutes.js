const express = require('express');

const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject
} = require('../controller/subCategoryController');

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoyValidator,
    deleteSubCtegoryValidator
} = require('../utils/validatorRoles/subCategoryValidator');

const authController = require('../controller/authController');

// mergeParams : Allow use to access parameters from other routes
const router = express.Router({mergeParams : true});

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        setCategoryIdToBody, 
        createSubCategoryValidator, 
        createSubCategory
    )
    .get(createFilterObject , getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator , getSubCategory)
    .put(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        updateSubCategoyValidator, 
        updateSubCategory)
    .delete(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        deleteSubCtegoryValidator, 
        deleteSubCategory
    )    

module.exports = router;