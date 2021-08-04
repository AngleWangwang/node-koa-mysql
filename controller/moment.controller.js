const momentServer = require('../service/moment.service')
const errorType = require('../constans/error-type')
const labelService = require('../service/label.service')
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
    async getPaginationList(ctx, next) {
        try {
            const { offset, size } = ctx.request.query
            const [result] = await momentServer.getPaginationList(offset, size)
            ctx.body = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async getMommentDetailsById(ctx, next) {
        try {
            const { mommentId } = ctx.params
            const [result] = await momentServer.getMommentDetailsById(mommentId)
            ctx.body = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async createLabel(ctx, next) { // 创建动态标签
        try {
            const { mommentId } = ctx.params
            const { labelNames } = ctx.request.body
            const arrList = []
            for (const name of labelNames) {
                let result = await labelService.isExistLabel(name) // 判断数据库标签是否存在
                if (!result.length) {
                    const [res] = await labelService.createLable(name)
                    result.push({ ID: res.insertId })
                }
                arrList.push({ mommentId, label_id: result[0].ID })
            }
            for (const item of arrList) {
                await momentServer.createLabel(item.mommentId, item.label_id)
            }
            ctx.body = '创建标签'
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }

    async createfile(ctx, next) { // 创建文件
        try {
                    
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
}
module.exports = new momentController()