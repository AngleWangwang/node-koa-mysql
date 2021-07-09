const errorType = require('../constans/error-type')
const errorHandler = (error, ctx) => {
    let status, message
    switch (error.message) {
        case errorType.USERNAME_OR_PASSWORD_IS_NOT_NULL:
            status = 400
            message = '用户名和密码不能为空'
            break
        case errorType.USERNAME_IS_EXIST:
            status = 409
            message = '用户已存在'
            break
        case errorType.USERNAME_IS_NOT_EXIST:
            status = 400
            message = '用户不存在'
            break
        case errorType.PASSWORD_IS_ERROR:
            status = 400
            message = '密码错误'
            break
        case errorType.UNAHTORIZATION:
            status = 401
            message = '无效的token'
            break
        default:
            status = 404
            message = 'NOT FOUND'
    }
    ctx.status = status
    ctx.body = message
}
module.exports = errorHandler