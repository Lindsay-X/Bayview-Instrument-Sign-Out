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
  studentName = req.body.name;
  id = req.body.id;
  instrument = req.body.instrument;
  barcode = req.body.barcode;
  signOutDate = req.body.signOutDate;
  returnDate = req.body.returnDate == "" ? null : req.body.returnDate;
  dataModel.addSignOut(studentName, id, instrument, barcode, signOutDate, returnDate, function() {
    res.redirect('/logs/currentsignout');
  });
});

router.post('/delete', function(req, res) {
  studentName = req.body.name;
  instrument = req.body.instrument;
  signOutDate = req.body.signout;
  dataModel.removeSignOut(studentName, instrument, signOutDate, function() {
    res.redirect('/logs/currentsignout');
  });
});

module.exports = router;