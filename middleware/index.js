const errorType = require('../constans/error-type')
const authService = require('../service/auth.service')

const verifyNotNull = async (ctx, next) => {
    const { username, password } = ctx.request.body
    // 用户名密码不能为空
    if (!username || !password) {
        const error = new Error(errorType.USERNAME_OR_PASSWORD_IS_NOT_NULL)
        return  ctx.app.emit('error', error, ctx)
    }
    await next()
}
const verifyPermission = async (ctx, next) => {
    const { id: userid } = ctx.user
    // const { momentId } = ctx.params
    const key = Object.keys(ctx.params)[0]
    const tableName = key.replace('Id', '')
    const tableId = ctx.params[key]
    try {
        const isPremission = await authService.checkAuth(tableName, tableId, userid)
        switch (isPremission) {
            case 'moment is no exist':
                throw new Error(errorType.NOTRESOURCES)
                // break
            case 'has premission':
                await next()
                break
            case 'not premission':
                throw new Error(errorType.UNPREMISSION)
                // break
        }
        // if (!isPremission) throw new Error('The user does not have permission')
    } catch (error) {
        // const error = new Error(errorType.UNPREMISSION)
        return ctx.app.emit('error', error, ctx)
    }
}
module.exports = {
    verifyNotNull,
    verifyPermission
}