var express = require("express");
var router = express.Router();
// var bodyParser = require('body-parser');

// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// router.use(urlencodedParser);

// route for admin sign in
router.get("/", async function (req, res) {
  res.render("admin");
});

router.post('/home', function(req, res) {
    res.redirect("/home");
});

router.post('/logs', function(req, res) {
    if (req.body.password == "123") {
        res.redirect("/");
    }
    else {
        console.log("wrong password")
    }
});

module.exports = router;
