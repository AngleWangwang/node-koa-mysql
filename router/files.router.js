const Router = require('koa-router')

const { verifyToken } = require('../middleware/login.middleware')

const { createfile } = require('../controller/moment.controller')

const filesRouter = new Router({ prefix: '/file' })

filesRouter.post('/mommentFile/:mommentId', verifyToken, createfile )

module.exports = filesRouter