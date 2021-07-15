const pool = require('../app/database')

class commentService {
    async create(mommentId, userid, content, ctx) {
        console.log(mommentId, userid, content)
        const statement = `INSERT INTO comment(user_id, momment_id, content) VALUES(?, ?,?)`
        try {
            const result = await pool.execute(statement, [userid, mommentId, content])
            return result
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
module.exports = new commentService()