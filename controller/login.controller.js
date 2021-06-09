
class LoginController {
    async create(ctx, next) {
        const { username } = ctx.request.body
        ctx.body = `登录成功，欢迎${username}回来~~`
        await next()
    }
}
module.exports = new LoginController()