const express = require('express');
const {
        createCategory,
        getCategories,
        getCategory,
        updateCategory
    } = require('../controller/categoryController');

const router = express.Router();

router.route('/')
    .post(createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)

module.exports = router;