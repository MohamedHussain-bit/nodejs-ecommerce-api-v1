const express = require('express');

const {
    createSubCategory
} = require('../controller/subCategoryController');

const {
    createSubCategoryValidator
} = require('../utils/validatorRoles/subCategoryValidator');

const router = express.Router();

router.route('/')
    .post(createSubCategoryValidator , createSubCategory)

module.exports = router;