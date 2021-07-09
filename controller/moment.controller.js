const momentServer = require('../service/moment.service')
class momentController {
    async create(ctx, next) {
        // 获取用户评论数据
        const detals = ctx.request.body
        // 插入数据库
        const result = await momentServer.create(detals)
        ctx.body = result
        await next()
    }
}
module.exports = new momentController()