const sqlite3 = require('sqlite3').verbose();
const rootDir = require('../utils/path');
const dbPath = rootDir+'/db/database.db';

const DBSOURCE = dbPath;
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    var usersTableQuery = `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL,
      email text NOT NULL, 
      password text NOT NULL
      )`
      var tasksTableQuery = `CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text NOT NULL,
        categoryId INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        date text NOT NULL,
        status INTEGER NOT NULL
        )`
      db.run(usersTableQuery, (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('DB Create users Tbl');
      });

    
      db.run(tasksTableQuery, (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('DB Create tasks Tbl');
      });
  });

module.exports = db;