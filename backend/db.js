// backend/db.js
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

let db;

async function initDB() {
  db = await open({
    filename: path.resolve(__dirname, "tasks.db"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      done INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call initDB() first.");
  }
  return db;
}

module.exports = { initDB, getDB };
