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

// mergeParams : Allow use to access parameters from other routes
const router = express.Router({mergeParams : true});

router.route('/')
    .post(setCategoryIdToBody , createSubCategoryValidator , createSubCategory)
    .get(createFilterObject , getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator , getSubCategory)
    .put(updateSubCategoyValidator , updateSubCategory)
    .delete(deleteSubCtegoryValidator , deleteSubCategory)    

module.exports = router;