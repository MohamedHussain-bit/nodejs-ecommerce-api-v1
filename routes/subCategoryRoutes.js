const express = require('express');

const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
} = require('../controller/subCategoryController');

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoyValidator,
    deleteSubCtegoryValidator
} = require('../utils/validatorRoles/subCategoryValidator');

const router = express.Router();

router.route('/')
    .post(createSubCategoryValidator , createSubCategory)
    .get(getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator , getSubCategory)
    .put(updateSubCategoyValidator , updateSubCategory)
    .delete(deleteSubCtegoryValidator , deleteSubCategory)    

module.exports = router;