const express = require('express');
const {param , validationResult} = require('express-validator');
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
    .get(param('id').isMongoId().withMessage('Invalied category id'),
        (req , res , next) => {
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({error:error.array()});
            }
            next();
        },
        getCategory
    )
    .put(updateCategory)
    .delete(deleteCategory)

module.exports = router;