var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header('content-type', 'application/json');
  res.send({list:['item-1','item-2']});
});

module.exports = router;
