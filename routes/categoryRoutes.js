const express = require('express');
const {createCategory} = require('../controller/categoryController');

const router = express.Router();

router.route('/')
    .post(createCategory)

module.exports = router;