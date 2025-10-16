const express = require('express');

const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory
} = require('../controller/subCategoryController');

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoyValidator
} = require('../utils/validatorRoles/subCategoryValidator');

const router = express.Router();

router.route('/')
    .post(createSubCategoryValidator , createSubCategory)
    .get(getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator , getSubCategory)
    .put(updateSubCategoyValidator , updateSubCategory)    

module.exports = router;