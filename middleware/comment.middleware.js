const errorType = require('../constans/error-type')
const commentService = require('../service/comment.service')
const authService = require('../service/auth.service')
class commentMiddleware{
    async verifyCommentId(ctx, next) {
        try {
            const { commentId } = ctx.params
            const { mommentId } = ctx.request.body
            console.log(mommentId)
            const result = await commentService.verifyCommentId(commentId, mommentId)
            ctx.body = result
           await next()
        } catch (err) {
            const error = new Error(errorType.NOTRESOURCES)
            return ctx.app.emit('error', error, ctx)
       }
    }
    async verifyPermission(ctx, next) {
        try {
            const { commentId } = ctx.params
            const { id: userid } = ctx.user
            const result = await authService.checkAuth(commentId, userid)
            ctx.body = result
            await next()
        } catch (err) {
            
        }
    }
}
module.exports = new commentMiddleware()