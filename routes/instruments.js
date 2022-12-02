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
    instrument = req.body.instrument;
    barcode = req.body.barcode;
    dataModel.addInstrument(instrument, barcode, function() {
      res.redirect('/logs/instruments');
    });
});

router.post('/delete', function(req, res) {
    barcode = req.body.barcode;
    dataModel.removeInstrument(barcode, function() {
      res.redirect('/logs/instruments');
    });
});

module.exports = router;
