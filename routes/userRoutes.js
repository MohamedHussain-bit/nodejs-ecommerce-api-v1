const express = require('express');

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    UploadUserImage,
    resizeImage,
    changeUserPassword,
} = require('../controller/userController');

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
} = require('../utils/validatorRoles/userValidator');

const router = express.Router();

router.put('/changePassword/:id' , changeUserPassword);

router.route('/')
    .post(UploadUserImage , resizeImage , createUserValidator , createUser)
    .get(getUsers)

router.route('/:id')
    .get(getUserValidator , getUser)
    .put(UploadUserImage , resizeImage , updateUserValidator , updateUser)
    .delete(deleteUserValidator , deleteUser)

module.exports = router;