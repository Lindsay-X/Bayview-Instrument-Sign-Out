var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);

var adminRouter = require('./routes/admin');
var homeRouter = require('./routes/home');
var confirmRouter = require('./routes/signoutconfirmation');
var inputRouter = require('./routes/signoutinput');
var indexRouter = require('./routes/index');
var instrumentsRouter = require('./routes/instruments');
var studentsRouter = require('./routes/students');
var signoutRouter = require('./routes/signout');
var currentsignoutRouter = require('./routes/currentsignout');

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// student routes
app.use('/', homeRouter);
app.use('/confirm', confirmRouter);
app.use('/input', inputRouter);

// admin routes
app.use('/admin', adminRouter);
app.use('/logs', indexRouter);
app.use('/logs/instruments', instrumentsRouter);
app.use('/logs/students', studentsRouter);
app.use('/logs/signout', signoutRouter);
app.use('/logs/currentsignout', currentsignoutRouter);

// set up server on localhost
var port = 3000;
app.listen(port, function(){
    console.log('server successfully set on http://localhost:' + port);
});

module.exports = app;

