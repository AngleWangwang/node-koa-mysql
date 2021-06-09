const app = require('./app')
const config = require('./app/config.js')

const pool = require('./app/database')

app.listen(config.APP_PORT, () => {
    console.log(`服务器在${config.APP_PORT}端口启动成功`)
})