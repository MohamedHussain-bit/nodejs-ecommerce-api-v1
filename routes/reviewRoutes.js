const express = require('express');

const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
    createFilterObject,
    setProductIdAndUserIdToBody,
} = require('../controller/reviewController');

const {
    createReviewValidator,
    getReviewValidator,
    updateReviewValidator,
    deleteReviewValidator,
} = require('../utils/validatorRoles/reviewValidator');

const authController = require('../controller/authController');

const router = express.Router({mergeParams : true});

router.route('/')
    .post(
        authController.protected, 
        authController.allowedTo('user'),
        setProductIdAndUserIdToBody,
        createReviewValidator,
        createReview
    )
    .get(createFilterObject , getReviews)

router.route('/:id')
    .get(getReviewValidator , getReview)
    .put(
        authController.protected, 
        authController.allowedTo('user'),
        updateReviewValidator,
        updateReview
    )
    .delete(authController.protected , authController.allowedTo('user' , 'manager' ,'admin') , deleteReviewValidator,deleteReview)

module.exports = router;