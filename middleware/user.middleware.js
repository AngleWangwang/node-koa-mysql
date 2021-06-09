const errorType = require('../constans/error-type')
const { MD5password } = require('../utils/index')
const { getUsername } = require('../service/user.service')
const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    // 用户名不能重复
    const result = await getUsername(username)
    if (result.length) {
        const error = new Error(errorType.USERNAME_IS_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
const handlePassword = async (ctx, next) => {
    let { password } = ctx.request.body
    ctx.request.body.password = MD5password(password)
    await next()
}
module.exports = {
    verifyUser,
    handlePassword
}