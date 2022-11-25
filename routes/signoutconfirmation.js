var express = require("express");
var router = express.Router();
var dataModel = require('../models/data-model.js');

// default route for sign out
router.get("/", function (req, res) {
  var id = req.query.id;
  var barcode = req.query.barcode;
  
  var name = dataModel.idToName(id);
  var instrument = dataModel.barcodeToInstrument(barcode);
  var date = dataModel.getDate();
  res.render("signoutconfirmation", {name:name, instrument:instrument, date:date});
});

router.post('/confirm', function(req, res) {
  // TODO: if instrument exists in SignOut database 
  // dataModel.signOutInstrument();

  //TODO: if instrument doesn't exist in SignOut database 
  // dataModel.returnInstrument();

  res.redirect("/");
});

router.post('/restart', function(req, res) {
  res.redirect("/");
});

module.exports = router;
