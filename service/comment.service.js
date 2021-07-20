const pool = require('../app/database')
class commentService {
    async create(mommentId, userid, content) {
        try {
            const statement = `INSERT INTO comment(user_id, momment_id, content) VALUES(?, ?,?)`
            const result = await pool.execute(statement, [userid, mommentId, content])
            return result
        } catch (err) {
            throw new Error(err.message)
        }
    }
    async verifyCommentId(commentId, mommentId) {
        try {
            const statement = `SELECT * FROM comment WHERE ID = ?`
            const [result] = await pool.execute(statement, [commentId])
            if (result.length === 0) {
                throw new Error('resource is not exsit')
            } else {
                if (result[0].momment_id !== mommentId) {
                    throw new Error('resource is not exsit')
                } else {
                    return result
                }
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
    async reply(commentId, mommentId, content, userid) {
        try {
            const statement = `INSERT INTO comment(comment_id, momment_id, content, user_id) VALUES(?,?,?,?)`
            const [result] = await pool.execute(statement, [commentId, mommentId, content, userid])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
    async update(commentId, content) {
        try {
            const statement = `UPDATE comment SET content = ? WHERE ID = ?;`
            const [result] = await pool.execute(statement, [content, commentId])
            return result
        } catch(err) {
            throw new Error(err)
        }
    }
    async delete(commentId) {
        console.log(commentId)
        try {
            const statement = `DELETE FROM comment WHERE ID = ?;`
            const [result] = await pool.execute(statement, [commentId])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}
module.exports = new commentService()