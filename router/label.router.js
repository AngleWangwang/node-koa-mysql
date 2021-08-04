const router = require('koa-router')
const { verifyToken } = require('../middleware/login.middleware')
const { create, verifyIsExistLabel } = require('../controller/label.controller')

const labelRouter = new router({ prefix: '/label' })

labelRouter.post('/', verifyToken, create) //创造标签
labelRouter.get('/:name', verifyToken, verifyIsExistLabel) //标签是否存在

module.exports = labelRouter