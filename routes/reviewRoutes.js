const express = require('express');

const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
} = require('../controller/reviewController');

const {
    createReviewValidator,
    getReviewValidator,
} = require('../utils/validatorRoles/reviewValidator');

const authController = require('../controller/authController');

const router = express.Router()

router.route('/')
    .post(
        authController.protected, 
        authController.allowedTo('user'),
        createReviewValidator,
        createReview
    )
    .get(getReviews)

router.route('/:id')
    .get(getReviewValidator , getReview)
    .put(authController.protected , authController.allowedTo('user') ,updateReview)
    .delete(authController.protected , authController.allowedTo('user' , 'manager' ,'admin') ,deleteReview)

module.exports = router;