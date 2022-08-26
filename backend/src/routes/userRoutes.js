const express = require('express');

const { getCurrentUser, updateProfile, updateAvatar } = require('../controllers/userControllers');

const { validateUserInfo, validateUserAvatar } = require('../middlewares/validate-requests');

const userRoutes = express.Router();

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', validateUserInfo, updateProfile);
userRoutes.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = { userRoutes };
