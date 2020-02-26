const mySql = require('mysql2')

const pool = mySql.createPool({
    host: "localhost",
    user: "root",
    database: "nili",
    password: "rootPassword"
})

module.exports = pool.promise()