const userService = require('../service/user.service')
const errorType = require('../constans/error-type')
const { MD5password } = require('../utils')
const verifyNameIsExsist = async (ctx, next) => {
    const { username } = ctx.request.body
    const result = await userService.getUsername(username)
    if (!result.length) {
        const error = new Error(errorType.USERNAME_IS_NOT_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
const verifyPasswordIsTrue = async (ctx, next) => {
    const { username, password } = ctx.request.body
    const hashpass = MD5password(password)
    const result = await userService.getUsername(username)
    if (result[0].PASSWORD !== hashpass) {
        const error = new Error(errorType.PASSWORD_IS_ERROR)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
module.exports = {
    verifyNameIsExsist,
    verifyPasswordIsTrue
}