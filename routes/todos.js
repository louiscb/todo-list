var express = require('express');
var router = express.Router();

/* GET todo page. */
router.get('/create', function(req, res, next) {
    res.send('new to asdfasf');
});

/* Create a to-do entry */
router.post('/create', function(req, res, next) {
    var db = req.db;
    var collection = db.get('todos');
    var d = new Date();
    req.body.timeStamp = d.toDateString();

    collection.insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: 'success', link: result._id } : { msg: err }
        );
    });
});

module.exports = router;