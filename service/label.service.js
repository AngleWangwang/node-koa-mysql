const pool = require('../app/database')
class labelService{
    async createLable(name) {
        const statement = `INSERT INTO label (name) VALUES (?)`
        try {
            const result = await pool.execute(statement, [name])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
    async isExistLabel(name) {
        const statement = `SELECT * FROM label WHERE name = ?`
        try {
            const [result] = await pool.execute(statement, [name])
            return result.length !== 0
        } catch (err) {
            throw new Error(err)
        }
    }
}
module.exports = new labelService()