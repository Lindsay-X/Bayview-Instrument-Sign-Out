var db = require('../database/db');

function readData(table, cb) {
    let sql = `SELECT * FROM ${table}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        cb(rows);
    })
}

function readCurrentData(table, cb) {
    let sql = `SELECT * FROM ${table} WHERE ReturnDate IS NULL`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        cb(rows);
    })
}

// Adding instrument to database
function addInstrument(instrument, barcodeNum, cb) {
    let sql = `INSERT INTO Instruments (Instrument, BarcodeNumber)
                VALUES(?, ?)`;
    db.run(sql, [instrument, barcodeNum], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) added: ${this.changes}`);
        console.log(`${instrument} with barcode number ${barcodeNum} added`);
    }, cb)
}
// Removing instrument from database
function removeInstrument(barcodeNum, cb) {
    let sql = `DELETE FROM Instruments
                WHERE BarcodeNumber = ?`;
    db.run(sql, [barcodeNum], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted: ${this.changes}`);
        console.log(`${barcodeNum} removed`);
    }, cb)
}

// Adding instrument to database
function addStudent(name, id, cb) {
    let sql = `INSERT INTO Students (StudentName, StudentID)
                VALUES(?, ?)`;
    db.run(sql, [name, id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) added: ${this.changes}`);
        console.log(`${name} with student number ${id} added`);
    }, cb)
}
// Removing student from database
function removeStudent(id, cb) {
    let sql = `DELETE FROM Students
                WHERE StudentID = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted: ${this.changes}`);
        console.log(`${id} removed`);
    }, cb)
}

// Future Note: search for instrument based on barcode in database instead of manual input 

// Adding instrument to database
function addSignOut(name, id, instrument, barcode, signOutDate, returnDate, cb) { 
    let sql = `INSERT INTO SignOut (StudentName, StudentID, Instrument, BarcodeNumber, SignOutDate, ReturnDate)
                VALUES(?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, id, instrument, barcode, signOutDate, returnDate], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) added: ${this.changes}`);
        console.log(`${name} with ${instrument} added`);
    }, cb)
}
// Removing sign out info from database
function removeSignOut(name, instrument, signoutDate, cb) {
    let sql = `DELETE FROM SignOut
                WHERE StudentName = ? AND Instrument = ? AND SignOutDate = ?`;
    db.run(sql, [name, instrument, signoutDate], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted: ${this.changes}`);
        console.log(`${name} with ${instrument} removed`);
    }, cb)
}


function signOutInstrument(studentName, studentID, instrument, barcodeNumber) {
    // sql statement
    let sql = `UPDATE SignOut
              SET StudentName = ?,
              StudentID = ?,
              Instrument = ?,
              BarcodeNumber = ?,
              SignOutDate = ?,
              ReturnDate = null`;

    // Get current Date
    const date = getDate();

    db.run(sql, [studentName, studentID, instrument, barcodeNumber, currentDate], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        console.log(`${studentName} signed out a ${instrument} on ${date}`);
    })
}

function returnInstrument(barcodeNumber) {
    // Sql statement
    let sql = `UPDATE SignOut
            SET ReturnDate = ?
            WHERE BarcodeNumber = ?`;

    
    const date = getDate();

    db.run(sql, [currentDate, barcodeNumber], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        console.log(`${studentID} returned an instrument on ${date}`);
    })
}

// Get current date
function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

module.exports = { readData, readCurrentData, addInstrument, removeInstrument, addStudent, removeStudent, addSignOut, removeSignOut, signOutInstrument, returnInstrument, getDate }