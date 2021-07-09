const Router = require('koa-router')
const { verifyNameIsExsist, verifyPasswordIsTrue, verifyToken } = require('../middleware/login.middleware')
const { verifyNotNull } = require('../middleware')
const { create } = require('../controller/login.controller')
const loginRouter = new Router({
    prefix: '/login'
})
loginRouter.post('/', verifyNotNull, verifyNameIsExsist, verifyPasswordIsTrue, create)
module.exports = loginRouter