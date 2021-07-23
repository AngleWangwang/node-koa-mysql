const commentService = require('../service/comment.service')
const errorType = require('../constans/error-type')

class commentController {
    async create(ctx, next) {
        try {
            const { mommentId, content } = ctx.request.body
            const { id: userid } = ctx.user
            const result = await commentService.create(mommentId, userid, content, ctx)
            ctx.body = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async reply(ctx, next) {
        try {
            const { commentId } = ctx.params
            const { mommentId, content } = ctx.request.body
            const { id: userid } = ctx.user
            const result = await commentService.reply(commentId, mommentId, content, userid)
            ctx.body = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async update(ctx, next) {
        try {
            const { commentId } = ctx.params
            const { content } = ctx.request.body
            // const { id: userid } = ctx.user
            const result = await commentService.update(commentId, content)
            ctx.body = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async remove(ctx, next) {
        try {
            const { commentId } = ctx.params
            const result = await commentService.delete(commentId)
            ctx.body = result
            await next()
        } catch(errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
}
module.exports = new commentController()