var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

// instruments route
router.get('/', function(req, res){
    dataModel.readData("Instruments", function(data) {
        res.render('instruments', {
            data: data
        })
    });
})

router.post('/create', function(req, res) {
    instrument = "Tuba";
    barcode = 1;
    dataModel.addInstrument(instrument, barcode, function() {
      res.redirect('/logs/instruments');
    });
});

router.post('/delete', function(req, res) {
    barcode = 1;
    dataModel.removeInstrument(barcode, function() {
      res.redirect('/logs/instruments');
    });
});

module.exports = router;
