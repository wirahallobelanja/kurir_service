const userController = require('../controller/userController');
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization');
const userRouter = require('express').Router();

userRouter.post('/users/register' ,userController.register)
userRouter.post('/users/login', userController.login)
userRouter.get('/users',  authentication, authorization(["user"]), userController.getAll)


module.exports = userRouter