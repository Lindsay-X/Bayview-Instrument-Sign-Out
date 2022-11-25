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
    let sql = `INSERT INTO SignOut (StudentName, StudentID, Instrument, BarcodeNumber, SignOutDate, ReturnDate)
    VALUES(?, ?, ?, ?, ?, null)`;

    // Get current date
    const date = getDate();

    db.run(sql, [studentName, studentID, instrument, barcodeNumber, date], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) added: ${this.changes}`);
        console.log(`${studentName} signed out a ${instrument} on ${date}`);
    })
}

function returnInstrument(barcodeNumber) {
    // Sql statement
    let sql = `UPDATE SignOut
            SET ReturnDate = ?
            WHERE BarcodeNumber = ?`;

    // Get current date
    const date = getDate();

    db.run(sql, [date, barcodeNumber], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        // console.log(`${studentID} returned an instrument on ${date}`);
    })
}

// Get current date
function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function idToName(id, cb) {
    let sql = `SELECT * FROM Students WHERE StudentID IS ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            throw err;
        }
        if (row == null) {
            cb("Anonymous Student");
        }
        else {
            cb(row.StudentName);
        }
    })
}

function barcodeToInstrument(barcode, cb) {
    let sql = `SELECT * FROM Instruments WHERE BarcodeNumber IS ?`;

    db.get(sql, [barcode], (err, row) => {
        if (err) {
            throw err;
        }
        if (row == null) {
            cb("Unknown Instrument");
        }
        else {
            cb(row.Instrument);
        }
    })
}

function currentlySignedOut(barcode, cb) {
    let sql = `SELECT * FROM SignOut WHERE BarcodeNumber IS ?`;

    db.get(sql, [barcode], (err, row) => {
        if (err) {
            throw err;
        }
        if (row == null) {
            cb("DNE");
        }
        else {
            cb(row);
        }
    })
}

module.exports = { readData, readCurrentData, addInstrument, removeInstrument, addStudent, removeStudent, addSignOut, removeSignOut, signOutInstrument, returnInstrument, getDate, idToName, barcodeToInstrument, currentlySignedOut }