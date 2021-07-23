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
    async getPaginationList(offset, size) {
        try {
            const statement = `
            SELECT m.ID id, m.content content, m.createTime createTime, m.updateTime updateTime,
            JSON_OBJECT('id', u.ID, 'name', u.NAME) user
            FROM moment m 
            LEFT JOIN users u ON m.user_id = u.ID
            LIMIT ?, ?;
            `
            const result = await pool.execute(statement, [offset, size])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
    async getMommentAndCommentDetailsById(mommentId) {
        try {
            const statement = `
                SELECT m.ID id, m.content content, m.createTime createTime, m.updateTime updateTime,
                JSON_OBJECT('id', u.ID, 'name', u.NAME) user,
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', c.ID, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.create_time, 'updateTime', c.update_time,
                        'users', JSON_OBJECT('id', cu.ID, 'name', cu.NAME)
                    )
                ) comments,
                (SELECT COUNT(*) FROM comment c WHERE c.momment_id = m.ID) commentCount
                FROM moment m 
                LEFT JOIN users u ON m.user_id = u.ID
                LEFT JOIN comment c ON c.momment_id = m.ID
                LEFT JOIN users cu ON cu.Id = c.user_id
                WHERE m.ID = ?;
            `
            const result = await pool.execute(statement, [mommentId])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}
module.exports = new momentServer()