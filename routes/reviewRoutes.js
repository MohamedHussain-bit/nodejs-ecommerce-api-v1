const express = require('express');

const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
} = require('../controller/reviewController');

const authController = require('../controller/authController');

const router = express.Router()

router.route('/')
    .post(authController.protected, authController.allowedTo('user') ,createReview)
    .get(getReviews)

router.route('/:id')
    .get(getReview)
    .put(authController.protected , authController.allowedTo('user') ,updateReview)
    .delete(authController.protected , authController.allowedTo('admin') ,deleteReview)

module.exports = router;