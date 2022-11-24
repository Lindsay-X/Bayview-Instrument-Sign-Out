var express = require("express");
var router = express.Router();

// default route for sign out
router.get("/", function (req, res) {
  res.render("home");
});

router.post('/admin', function(req, res) {
    res.redirect("/admin");
});

module.exports = router;
