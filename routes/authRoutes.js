const express = require('express');

const {
    signup,
} = require('../controller/authController');
const {
    signupValidator,
} = require('../utils/validatorRoles/authValidator');


const router = express.Router();

router.route('/')
    .post(signupValidator , signup)

module.exports = router;