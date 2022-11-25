var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

// default route for logs (shows all rows and columns)
router.get('/', function(req, res){
  dataModel.readData("SignOut", function(data) {
      res.render('index', {
          data: data
      })
  });
})

router.post('/create', function(req, res) {
  studentName = req.body.name;
  id = req.body.id;
  instrument = req.body.instrument;
  barcode = req.body.barcode;
  signOutDate = req.body.signOutDate;
  returnDate = req.body.returnDate == "" ? null : req.body.returnDate;
  dataModel.addSignOut(studentName, id, instrument, barcode, signOutDate, returnDate, function() {
    res.redirect('/logs');
  });
});

router.post('/delete', function(req, res) {
  studentName = "Larris Xie";
  instrument = "Flute"
  signOutDate = "2022-11-22"
  dataModel.removeSignOut(studentName, instrument, signOutDate, function() {
    res.redirect('/logs');
  });
});

module.exports = router;