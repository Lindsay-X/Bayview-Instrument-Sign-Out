var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

// student log route 
router.get('/', function(req, res){
    dataModel.readData("Students", function(data) {
        res.render('students', {
            data: data
        })
    });
})

router.post('/create', function(req, res) {
    studentName = req.body.name;
    id = req.body.id;
    dataModel.addStudent(studentName, id, function() {
      res.redirect('/logs/students');
    });
});

router.post('/delete', function(req, res) {
    id = req.body.id;
    dataModel.removeStudent(id, function() {
      res.redirect('/logs/students');
    });
});

module.exports = router;