
const labelSevice = require('../service/label.service')
const errorType = require('../constans/error-type')
class labelController{
    async create(ctx, next) {
        const { name } = ctx.request.body
        try {
            const result = await labelSevice.createLable(name)
            ctx.body = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
    async verifyIsExistLabel(ctx, next) {
        const { name } = ctx.request.body
        try {
            const result = await labelSevice.isExistLabel(name)
            ctx.body = result
            ctx.isExistLabel = result
            await next()
        } catch (errMsg) {
            const error = new Error(errorType.SYSTEMERROR)
            return ctx.app.emit('error', error, ctx, errMsg.message)
        }
    }
}
module.exports = new labelController()