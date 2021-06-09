const pool = require('../app/database')
class userService {
    async create(user) {
        const { username, password } = user
        const statement = `INSERT INTO users (NAME, PASSWORD) VALUES (?, ?)`
        const result = await pool.execute(statement, [username, password])
        return result
    }
    async getUsername(name) {
        const statement = `SELECT * FROM users WHERE NAME = ?`
        const result = await pool.execute(statement, [name])
        return result[0]
    }
}

module.exports = new userService()