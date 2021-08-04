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
    async createAvatar(fileName, userId) {
        const statement = `INSERT INTO user_picture(file_name, user_id) VALUES(?, ?)`
        try {
            const result = await pool.execute(statement, [fileName, userId])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = new userService()