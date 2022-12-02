var express = require("express");
var router = express.Router();

// route for admin sign in
router.get("/", function (req, res) {
  res.render("admin");
});

router.post('/home', function(req, res) {
    res.redirect("/");
});

router.post('/logs', function(req, res) {
    if (req.body.password == "123") {
        res.redirect("/logs");
    }
    else {
        console.log("wrong password")
    }
});

module.exports = router;
