const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private_key.pem'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public_key.pem'))

dotenv.config()

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY