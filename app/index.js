const koa = require('koa')
const app = new koa()
const userRouter = require('../router/user.router')
const loginRouter = require('../router/login.router')
const momentRouter = require('../router/moment.router')
const errorHandler = require('./error-handler')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())
app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())

app.on('error', errorHandler)

module.exports = app