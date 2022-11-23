var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

// student log route 
router.get('/', async function(req, res){
    dataModel.readData("Students", function(data) {
        res.render('students', {
            data: data
        })
    });
})

router.post('/create', function(req, res) {
    studentName = "Larris Xie";
    id = 340920198;
    dataModel.addStudent(studentName, id, function() {
      res.redirect('/students');
    });
});

router.post('/delete', function(req, res) {
    id = 340920198;
    dataModel.removeStudent(id, function() {
      res.redirect('/students');
    });
});

module.exports = router;