const express = require('express');
const {
        getCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator,
        createCategoryValidator
} = require('../utils/validatorRoles/categoryValidator');
const {
        createCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory
    } = require('../controller/categoryController');

const router = express.Router();

router.route('/')
    .post(createCategoryValidator , createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategoryValidator , getCategory)
    .put(updateCategoryValidator , updateCategory)
    .delete(deleteCategoryValidator , deleteCategory)

module.exports = router;