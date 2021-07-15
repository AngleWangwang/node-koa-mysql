const koa = require('koa')
const fs = require('fs')
const path = require('path')
const bodyParser = require('koa-bodyparser')

const app = new koa()
// const userRouter = require('../router/user.router')
// const loginRouter = require('../router/login.router')
// const momentRouter = require('../router/moment.router')
const errorHandler = require('./error-handler')

// post请求参数解析
app.use(bodyParser())

// 递归查找文件路径
function readRouterFile(dir, list = []) {
    var arr = fs.readdirSync(dir)
    arr.forEach(function (item) {
        var fullpath = path.join(dir, item)
        var stats = fs.statSync(fullpath)
        if (stats.isDirectory()) {
            readRouterFile(fullpath, list)
        } else {
            list.push(fullpath)
        }
    });
    return list
}

const routerDirList = readRouterFile(path.resolve(__dirname, '../router'))
// 批量注册路由
routerDirList.forEach(file => {
    const router = require(file)
    app.use(router.routes())
    app.use(router.allowedMethods())
})
// console.log(readRouterFile(path.resolve(__dirname,'../router')))
// app.use(bodyParser())
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())
// app.use(momentRouter.routes())
// app.use(momentRouter.allowedMethods())

// 统一错误错误处理
app.on('error', errorHandler)

module.exports = app