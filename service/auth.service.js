const pool = require('../app/database')

class authService{
    async checkAuth(tableName, tableId, userid) {
        // const statement =  `SELECT * FROM moment m WHERE m.ID =? AND m.user_id = ?;`
        const statement =  `SELECT * FROM ${tableName} m WHERE m.ID =?;`
        const [result] = await pool.execute(statement, [tableId])
        console.log('result===', result)
        if (result.length === 0) {
            return 'moment is no exist'
        } else {
            return result[0].user_id === userid ? 'has premission' : 'not premission'
        }
    } 
}
module.exports = new authService()