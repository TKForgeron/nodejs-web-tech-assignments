var file = __dirname + "database/database.db3";
// Verbose for long stacktrace even tho i won't use that anyway
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

module.exports = db;