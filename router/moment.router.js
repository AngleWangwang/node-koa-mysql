const Router = require('koa-router')

const { create, getMomentListByUserid, update, remove } = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/moment.middleware')

const momentRouter = new Router({ prefix: '/moment' })
momentRouter.post('/', verifyToken, create)
momentRouter.get('/', verifyToken, getMomentListByUserid)
momentRouter.patch('/:momentId', verifyToken, verifyPermission, update)
momentRouter.delete('/:momentId', verifyToken, verifyPermission, remove)

module.exports = momentRouter
