var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

// current sign out route 
router.get('/', function(req, res){
  dataModel.readCurrentData("SignOut", function(data) {
      res.render('currentsignout', {
          data: data
      })
  });
})

router.post('/create', function(req, res) {
  studentName = "Larris Xie";
  id = 340920198;
  instrument = "Flute";
  barcode = 123;
  signOutDate = "2022-11-22"
  returnDate = ""
  dataModel.addSignOut(studentName, id, instrument, barcode, signOutDate, returnDate, function() {
    res.redirect('/logs/currentsignout');
  });
});

router.post('/delete', function(req, res) {
  studentName = "Larris Xie";
  instrument = "Flute"
  signOutDate = "2022-11-22"
  dataModel.removeSignOut(studentName, instrument, signOutDate, function() {
    res.redirect('/logs/currentsignout');
  });
});

module.exports = router;