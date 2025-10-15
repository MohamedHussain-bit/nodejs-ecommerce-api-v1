const express = require('express');

const {
    createSubCategory,
    getSubCategories
} = require('../controller/subCategoryController');

const {
    createSubCategoryValidator
} = require('../utils/validatorRoles/subCategoryValidator');

const router = express.Router();

router.route('/')
    .post(createSubCategoryValidator , createSubCategory)
    .get(getSubCategories)

module.exports = router;