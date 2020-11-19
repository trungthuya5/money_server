const db = require('./postgres')


module.exports = {
    sql: db.Instance(),
}