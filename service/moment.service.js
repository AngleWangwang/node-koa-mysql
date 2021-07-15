const pool = require('../app/database')
class momentServer {
    // 创建评论
    async create(data) {
        const { user_id, content } = data
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
        const result = await pool.execute(statement, [user_id, content])
        return result
    }
    // 根据用户id查看所有评论以及评论的作者信息
    async getMomentListByUserid(userid) {
        const statement =  `SELECT m.content content, m.ID id, m.createTime createTime, m.updateTime updateTime, JSON_OBJECT('name', u.NAME, 'id', u.ID) user FROM moment m
        LEFT JOIN users u on u.ID=m.user_id WHERE m.user_id = ?`
        const result = await pool.execute(statement, [userid])
        return result
    }
    // 更新用户评论
    async updateByMomentId(momentId, content) {
        const statement = `UPDATE moment SET content = ? WHERE ID = ?;`
        const result = await pool.execute(statement, [content, momentId])
        return result
    }
    // 删除评论
    async removeByMomentId(momentId) {
        console.log(momentId)
        try {
            const statement = `DELETE FROM moment WHERE ID = ?`
            const result = await pool.execute(statement, [momentId])
            return result
        } catch (err) {
            console.log(err)
         }
    }
}
module.exports = new momentServer()