const fs = require('fs')
const path = require('path')

const userService = require('../service/user.service')
const errorType = require('../constans/error-type')
class userController {
    async create(ctx, next) {
        // 1.获取用户数据
        const user = ctx.request.body
        // // 2.插入数据库     
        const result = await userService.create(user)
        // // 3.返回结果
        // ctx.body = `返回用户结果:${result}`
        ctx.body = result
        await next()
    }
    async createPicture(ctx, next) {
        try {
            const { id } = ctx.user
            const { filename, size, mimetype, path} = ctx.req.file
            // console.log(file)
            const result = await userService.createAvatar(id, filename, size, mimetype, path)
            ctx.body = result
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async fetchAvatar(ctx, next) {
        try {
            console.log(process.env.APP_PORT)
            const { id } = ctx.request.params
            const [result] = await userService.fetchAvatar(id)
            const filePath = path.join(__dirname, '../', result[0].path)
            let file = null
            try {
                file = fs.readFileSync(filePath)
            } catch {
                //如果服务器不存在请求的图片，返回默认图片
                filePath = path.join(__dirname, '../static/default/user_avatar.jpg')
                file = fs.readFileSync(filePath)
            }
            ctx.set('Content-Type', result[0].mimetype)
            ctx.body = file
        } catch(errMsg) {  
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
}
module.exports = new userController()