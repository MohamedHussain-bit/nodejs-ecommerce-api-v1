const express = require('express');

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    UploadUserImage,
    resizeImage,
} = require('../controller/userController');

const router = express.Router();

router.route('/')
    .post(UploadUserImage , resizeImage , createUser)
    .get(getUsers)

router.route('/:id')
    .get(getUser)
    .put(UploadUserImage , resizeImage , updateUser)
    .delete(deleteUser)

module.exports = router;