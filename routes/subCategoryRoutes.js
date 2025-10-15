const express = require('express');

const {
    createSubCategory,
    getSubCategories,
    getSubCategory
} = require('../controller/subCategoryController');

const {
    createSubCategoryValidator,
    getSubCategoryValidator
} = require('../utils/validatorRoles/subCategoryValidator');

const router = express.Router();

router.route('/')
    .post(createSubCategoryValidator , createSubCategory)
    .get(getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator , getSubCategory)    

module.exports = router;