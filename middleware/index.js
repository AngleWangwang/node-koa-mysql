const errorType = require('../constans/error-type')
const verifyNotNull = async (ctx, next) => {
    const { username, password } = ctx.request.body
    // 用户名密码不能为空
    if (!username || !password) {
        const error = new Error(errorType.USERNAME_OR_PASSWORD_IS_NOT_NULL)
        return  ctx.app.emit('error', error, ctx)
    }
    await next()
}
module.exports = {
    verifyNotNull
}