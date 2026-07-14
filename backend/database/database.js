const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "auth.db"),
    (err) => {
        if (err) {
            console.error("❌ Database connection failed:", err.message);
        } else {
            console.log("✅ Connected to SQLite Database");
        }
    }
);

db.serialize(() => {

    // OTP Table
    db.run(`
        CREATE TABLE IF NOT EXISTS otp (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            phone TEXT NOT NULL,

            otp TEXT NOT NULL,

            expires_at INTEGER NOT NULL,

            attempts INTEGER DEFAULT 0

        )
    `);

    console.log("✅ OTP table is ready");


    // Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            phone TEXT UNIQUE NOT NULL,

            created_at INTEGER NOT NULL,

            last_login INTEGER NOT NULL

        )
    `);

    console.log("✅ Users table is ready");

});

module.exports = db;