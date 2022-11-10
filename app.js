var express = require('express');
var app = express();
// const func = require("./functions");
const sqlite3 = require("sqlite3").verbose();

app.use(express.static('public'))
app.set('view engine', 'ejs');

// connect to database with sign out/return information
function connectSignOutDB() {
  let db = new sqlite3.Database(
    "./InstrumentSignIn.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the sign out database.");
    }
  );
  return db;
}

// connect to database with instrument information
function connectInstrumentDB() {
  let db = new sqlite3.Database(
    "./Instruments.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the instrument database.");
    }
  );
  return db;
}

// default route for logs (shows all rows and columns)
app.get('/', async function(req, res){
  let db = await connectSignOutDB();
  let sql = `SELECT * FROM instruments`;
  await db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('index', {
      data: rows
    })
  });
})

// instrument log route 
app.get('/instruments', async function(req, res){
  let db = await connectInstrumentDB();
  let sql = `SELECT * FROM instruments`;
  await db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('instruments', {
      data: rows
    })
  });
})

// student log route 
app.get('/students', async function(req, res){
  let db = await connectSignOutDB();
  let sql = `SELECT * FROM instruments`;
  await db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('students', {
      data: rows
    })
  });
})

// sign out route 
app.get('/signout', async function(req, res){
  let db = await connectSignOutDB();
  let sql = `SELECT * FROM instruments`;
  await db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('signout', {
      data: rows
    })
  });
})

// current sign out route 
app.get('/currentsignout', async function(req, res){
  let db = await connectSignOutDB();
  // only get students who have not returned their instrument yet 
  let sql = `SELECT * FROM instruments WHERE ReturnDate IS NULL`;
  await db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('currentsignout', {
      data: rows
    })
  });
})

// set up server on localhost
var port = 3000;
app.listen(port, function(){
    console.log('server successfully set on http://localhost:' + port);
});

// func.signIn(db, "Clarinet", "23456", "Aidan Leung", "348686775");
// func.signIn(db, "Trombone", "12345", "Larris Xie", "340920198");
// func.signOut(db, "348686775");

// db.close();

