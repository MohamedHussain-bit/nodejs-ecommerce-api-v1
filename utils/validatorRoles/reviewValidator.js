const {check} = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createReviewValidator = [
    check('title')
        .optional(),
    validatorMiddleware
];