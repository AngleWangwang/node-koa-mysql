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
    async getMomentListByUserid(ctx, next) {
        const id = ctx.request.query.id
        const result = await momentServer.getMomentListByUserid(id)
        ctx.body = result[0]
        await next()
    }
    async update(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body

        const [result] = await momentServer.updateByMomentId(momentId, content)
    
        ctx.body = result
        await next()
    }
    async remove(ctx, next) {
        const { momentId } = ctx.params

        const [result] = await momentServer.removeByMomentId(momentId)
        ctx.body = result
        await next()
    }
}
module.exports = new momentController()