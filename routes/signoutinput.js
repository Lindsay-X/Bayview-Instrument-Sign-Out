var express = require("express");
var router = express.Router();

// default route for sign out
router.get("/input", async function (req, res) {
  res.render("signoutinput");
});

module.exports = router;
