const Router = require('koa-router')
const { verifyToken } = require('../middleware/login.middleware')
const { create } = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyToken, create)
 module.exports = commentRouter