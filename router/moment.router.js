const Router = require('koa-router')

const { create, getMomentListByUserid, update, remove, getPaginationList, getMommentDetailsById, createLabel } = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware')

const momentRouter = new Router({ prefix: '/moment' })
momentRouter.post('/', verifyToken, create)
momentRouter.get('/', verifyToken, getMomentListByUserid) //根据用户id获取动态列表
momentRouter.get('/list', verifyToken, getPaginationList) // 获取全部动态列表（分页）
momentRouter.get('/:mommentId', verifyToken, getMommentDetailsById) // 根据动态id获取所有评论，标签详情
momentRouter.patch('/:momentId', verifyToken, verifyPermission, update)
momentRouter.delete('/:momentId', verifyToken, verifyPermission, remove)
momentRouter.post('/createLabel/:mommentId', verifyToken, createLabel) // 动态添加标签

module.exports = momentRouter
