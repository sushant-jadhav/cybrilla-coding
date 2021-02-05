var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'PCKG Backend' });
  res.json({ message: "Welcome to Cybrilla cart application." });
});

module.exports = router;
