const pool = require('../app/database')
class momentServer {
    // 创建评论
    async create(data) {
        const { user_id, content } = data
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
        const result = await pool.execute(statement, [user_id, content])
        return result
    }
    // 根据id查看某条评论以及评论的作者
    async getDetailsById(id) {
        
    }
}
module.exports = new momentServer()