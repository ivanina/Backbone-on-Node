var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header('content-type', 'application/json');
  res.send({list:['item-1','item-2']});
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    res.header('content-type', 'application/json');
    res.send({query:query,url_parts:url_parts});
});

module.exports = router;
