const sqlite3 = require('sqlite3').verbose();

// Change database path to volume mount point
const db = new sqlite3.Database('/app/data/diary.db');

// Create diary table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS diary_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      date TEXT
    )
  `);
});

module.exports = db; 