var express = require("express");
var router = express.Router();
var dataModel = require('../models/data-model.js');

// default route for sign out
router.get("/", function (req, res) {
  var studentName = req.query.name;
  var id = req.query.id;
  var barcode = req.query.barcode;

  dataModel.currentlySignedOut(barcode, function(result) {
    var action = (result == "DNE") ? "signed out" : "returned";
    dataModel.idToName(id, function(name) {
      dataModel.barcodeToInstrument(barcode, function(instrument) {
        var date = dataModel.getDate();
        if (name == "Anonymous Student") {
          name = studentName;
        }
        res.render("signoutconfirmation", {name:name, instrument:instrument, date:date, action:action, id:id, barcode:barcode});
      })
    });
  });
});

router.post('/confirm', function(req, res) {
  var barcode = req.query.barcode;
  dataModel.currentlySignedOut(barcode, function(result) {
    var studentName = req.query.name;
    var id = req.query.id;
    if (result == "DNE") { // If instrument is not currently signed out, signout the instrument 
      dataModel.idToName(id, function(name) {
        if (name == "Anonymous Student") {
          dataModel.addStudent(studentName, id);
          name = studentName;
        }
        dataModel.barcodeToInstrument(barcode, function(instrument) {
          dataModel.signOutInstrument(name, id, instrument, barcode);  
        })
      })
    }
    else { // If instrument is already signed out, return the instrument 
      dataModel.returnInstrument(barcode);
    }
  }) 

  res.redirect("/");
});

router.post('/restart', function(req, res) {
  res.redirect("/");
});

module.exports = router;
