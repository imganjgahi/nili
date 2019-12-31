const sqlite3 = require('sqlite3').verbose();
const rootDir = require('../utils/path');
const dbPath = rootDir+'/db/database.db';

const DBSOURCE = dbPath;
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    var sql = `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL,
      email text NOT NULL, 
      password text NOT NULL
      )`
      db.run(sql, (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('DB Create user Tbl');
      });
  });

module.exports = db;