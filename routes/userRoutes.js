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
    getLoggedUserData,
    updateLoggedUserPassword,
} = require('../controller/userController');

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
} = require('../utils/validatorRoles/userValidator');

const authController = require('../controller/authController');

const router = express.Router();

router.put('/changePassword/:id' , changeUserPasswordValidator , changeUserPassword);

router.route('/')
    .post(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        UploadUserImage, 
        resizeImage, 
        createUserValidator, 
        createUser
    )
    .get(getUsers)

router.route('/:id')
    .get(getUserValidator , getUser)
    .put(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        UploadUserImage, 
        resizeImage, 
        updateUserValidator, 
        updateUser
    )
    .delete(
        authController.protected,
        authController.allowedTo('admin' , 'manager'),
        deleteUserValidator, 
        deleteUser
    )

router.route('/getMe')
    .get(authController.protected , getLoggedUserData , getUser)

router.route('/changeMypassword')
    .put(authController.protected , updateLoggedUserPassword)

module.exports = router;