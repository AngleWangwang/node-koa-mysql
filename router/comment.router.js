const Router = require('koa-router')
const { verifyToken } = require('../middleware/login.middleware')
const { create, reply } = require('../controller/comment.controller')
const { verifyCommentId } = require('../middleware/comment.middleware')
// const { verifyPermission } = require('../middleware/comment.middleware')
const { verifyPermission } = require('../middleware')
const { update, remove } = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyToken, create)
commentRouter.post('/reply/:commentId', verifyToken, verifyCommentId ,reply)
commentRouter.patch('/:commentId', verifyToken, verifyPermission, update)
commentRouter.delete('/:commentId', verifyToken, verifyPermission, remove)

 module.exports = commentRouter