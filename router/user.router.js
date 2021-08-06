const Router = require('koa-router')
const { create, createPicture, fetchAvatar } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { verifyNotNull } = require('../middleware')
const { verifyToken } = require('../middleware/login.middleware')

const upload = require('../middleware/uploadConfig.middleware')



const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyNotNull, verifyUser, handlePassword, create)
userRouter.post('/avatar', verifyToken, upload.single('avatar'), createPicture)
userRouter.get('/avatar/:id', fetchAvatar)

module.exports = userRouter