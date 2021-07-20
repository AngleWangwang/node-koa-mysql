const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const { checkAuth } = require('../service/auth.service')
const errorType = require('../constans/error-type')
const { MD5password } = require('../utils')
const { PUBLIC_KEY } = require('../app/config')
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
    ctx.user = result[0]
    await next()
}

const verifyToken = async (ctx, next) => {
    const authorization = ctx.headers.authorization
    if (!authorization) {
        const error = new Error(errorType.UNAHTORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', '')
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.body = result
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAHTORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
}

module.exports = {
    verifyNameIsExsist,
    verifyPasswordIsTrue,
    verifyToken
}