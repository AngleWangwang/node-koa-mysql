const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class LoginController {
    async create(ctx, next) {
        // console.log(ctx.user) // 登录中间件注入user信息
        // 颁发token
        const user = {
            username: ctx.user.NAME,
            id: ctx.user.ID
        }
        const token = jwt.sign(user, PRIVATE_KEY, {
            expiresIn: 24 * 60 * 60,
            algorithm: 'RS256'
        } )
        ctx.body = {
            token,
            user
        }
        await next()
    }
}
module.exports = new LoginController()