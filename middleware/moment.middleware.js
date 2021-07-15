
const authService = require('../service/auth.service')
const errorType = require('../constans/error-type')

const verifyPermission = async (ctx, next) => {
    const { id: userid } = ctx.user
    const { momentId } = ctx.params
    try {
        const isPremission = await authService.verifyMomentPermission(momentId, userid, ctx)
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