const express = require('express');
const { registerValidation, loginValidation } = require('../validations');
const { handleValidationErrors, checkAuth } = require('../middlewares');
const { UserController } = require('../controllers');

const authRouter = express.Router()

authRouter.post('/registration', registerValidation, handleValidationErrors, UserController.register)
authRouter.post('/login', loginValidation, handleValidationErrors, UserController.login)
authRouter.get('/me', checkAuth, UserController.getMe)
authRouter.patch('/me', checkAuth, UserController.updateMe)

module.exports = authRouter;