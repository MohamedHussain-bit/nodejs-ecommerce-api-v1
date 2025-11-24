const express = require('express');

const {
    signup,
    login,
    forgotPassword,
    verifyResetCode,
    resetPassword,
} = require('../controller/authController');

const {
    signupValidator,
    loginValidator,
} = require('../utils/validatorRoles/authValidator');


const router = express.Router();

router.route('/signup')
    .post(signupValidator , signup)

router.route('/login')
    .post(loginValidator , login)

router.route('/forgotPassword')
    .post(forgotPassword)

router.route('/verifyResetCode')
    .post(verifyResetCode)

router.route('/resetPassword')
    .put(resetPassword)

module.exports = router;