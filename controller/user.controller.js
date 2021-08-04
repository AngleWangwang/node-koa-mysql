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
            const file = ctx.req.file
            const result = await userService.createAvatar(file.filename, id)
            ctx.body = result
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
}
module.exports = new userController()