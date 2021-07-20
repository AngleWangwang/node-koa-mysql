
const authService = require('../service/auth.service')
const errorType = require('../constans/error-type')

const verifyPermission = async (ctx, next) => {
    const { id: userid } = ctx.user
    // const { momentId } = ctx.params
    const key = Object.keys(ctx.params)[0]
    const tableName = key.replace('Id', '')
    const momentId = ctx.params[key]
    console.log(tableName, momentId)
    try {
        const isPremission = await authService.checkAuth(tableName, momentId, userid)
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
    verifyPermission
}