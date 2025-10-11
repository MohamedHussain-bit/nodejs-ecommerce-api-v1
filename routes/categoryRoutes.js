const express = require('express');
const {getCategoryValidator} = require('../utils/validatorRoles/categoryValidator');
const {
        createCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory
    } = require('../controller/categoryController');

const router = express.Router();

router.route('/')
    .post(createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategoryValidator , getCategory)
    .put(updateCategory)
    .delete(deleteCategory)

module.exports = router;