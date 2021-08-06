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
    async createAvatar(userId, fileName, size, mimetype, path) {
        const statement = `INSERT INTO user_picture(user_id, file_name, size, mimetype, path) VALUES(?, ?, ?, ?, ?)`
        try {
            const result = await pool.execute(statement, [userId, fileName, size, mimetype, path])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
    async fetchAvatar(userId) {
        const statement = `SELECT * FROM user_picture WHERE user_id = ?`
        try {
            const result = await pool.execute(statement, [userId])
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = new userService()