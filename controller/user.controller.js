const userService = require('../service/user.service')
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
}
module.exports = new userController()