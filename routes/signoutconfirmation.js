var express = require("express");
var router = express.Router();

// default route for sign out
router.get("/confirm", async function (req, res) {
  res.render("signoutconfirmation");
});

module.exports = router;
