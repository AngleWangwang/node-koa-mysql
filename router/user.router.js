const Router = require('koa-router')
const { create } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { verifyNotNull } = require('../middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyNotNull, verifyUser, handlePassword, create)

module.exports = userRouter