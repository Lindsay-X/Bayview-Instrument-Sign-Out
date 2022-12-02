var express = require("express");
var router = express.Router();

// default route for sign out
router.get("/", function (req, res) {
  var name = req.query.name;
  var id = req.query.id;
  res.render("signoutinput", {name:name, id:id});
});

router.post('/confirm', function(req, res) {
  var name = encodeURIComponent(req.query.name);
  var id = encodeURIComponent(req.query.id);
  var barcode = encodeURIComponent(req.body.barcode);
  res.redirect("/confirm?name=" + name + "&id=" + id + "&barcode=" + barcode);
});

router.post('/home', function(req, res) {
  res.redirect("/");
});

module.exports = router;
