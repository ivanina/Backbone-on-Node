var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.header('content-type', 'application/json');
    res.send(
        {
            title: 'No title (s)',
            author: 'unknown',
            releaseDate: 2011,
            description: ''
        }
    );
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