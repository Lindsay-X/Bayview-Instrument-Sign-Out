// const sqlite3 = require("sqlite3").verbose();
// // opening/creating a database, first param takes the relative path of database
// let db = new sqlite3.Database("InstrumentSignIn.db", (err) => {
//     if (err) {
//         return console.error(err.message);
//     }

//     console.log("Database Connected.")
// });



function signIn(db, instrument, barcodeNum, name, studentID) {
    // sql statement
    let sql = `UPDATE instruments
              SET StudentName = ?,
              Instrument = ?,
              BarcodeNumber = ?,
              SignInDate = ?,
              SignOutDate = null
            WHERE StudentID = ?`;

    // Get current Date
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    db.run(sql, [name, instrument, barcodeNum, currentDate, studentID], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        console.log(`${name} signed in a ${instrument} on ${date}`);
    })
}

function signOut(db, studentID) {
    // Sql statement
    let sql = `UPDATE instruments
            SET SignOutDate = ?
            WHERE StudentID = ?`;
    // let sql = `INSERT INTO instruments(SignOutDate, StudentID) VALUES(?, ?)`;

    // Get current Date
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    db.run(sql, [currentDate, studentID], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        console.log(`${studentID} signed out an instrument on ${date}`);
    })
}

// Test cases
//signIn(db, "Clarinet", "23456", "Aidan Leung", "348686775");
//signOut(db, "348686775");

// db.close();
module.exports = { signIn, signOut };