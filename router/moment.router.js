const Router = require('koa-router')
const { create } = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')

const momentRouter = new Router({ prefix: '/moment' })
momentRouter.post('/', verifyToken, create)

module.exports = momentRouter
