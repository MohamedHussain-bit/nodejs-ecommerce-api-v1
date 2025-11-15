const express = require('express');

const {
    signup,
} = require('../controller/authController');
const {
    signupValidator,
} = require('../utils/validatorRoles/authValidator');


const router = express.Router();

router.route('/signup')
    .post(signupValidator , signup)

module.exports = router;