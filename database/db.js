var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(
  "./database/Instruments.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the instrument database.");
  }
);

module.exports = db;
