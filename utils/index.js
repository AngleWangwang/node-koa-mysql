const crypto = require('crypto')
const MD5password = (password) => {
    const hash = crypto.createHash('md5')
    const result = hash.update(password).digest('hex')
    return result
}
module.exports = {
    MD5password
}