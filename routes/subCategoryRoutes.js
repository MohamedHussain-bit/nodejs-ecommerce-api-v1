const express = require('express');

const {
    createSubCategory
} = require('../controller/subCategoryController');

const router = express.Router();

router.route('/')
    .post(createSubCategory)

module.exports = router;