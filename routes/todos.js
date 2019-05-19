var express = require('express');
var router = express.Router();
var collectionName = "todos";

/* CREATE a to-do entry */
router.post('/create', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);
    var d = new Date();
    req.body.timeStamp = d.toDateString();
    req.body.done = false;

    collection.insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg : 'success', "todo" : result} : { msg: err }
        );
    });
});


/* UPDATE a to-do entry */
router.post('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);
    let id = req.params.id;

    // set isn't properly working, gets rid of values if they're not there
    collection.update({_id: id}, { $set: {title: req.body.title,}}, function (err, todo) {
        res.send((err == null) ? {msg: 'success'} : {msg: err});
    });
});

/* UPDATE a to-do entry */
router.post('/:id/toggle-done', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);
    let id = req.params.id;

    // set isn't properly working, gets rid of values if they're not there
    collection.findOne({_id :id }, function(e, newTodo) {
        let newDone = !newTodo.done;

        collection.update({_id: id}, {$set: {done: newDone}}, function (err, todo) {
            res.send((err == null) ? {msg: 'success'} : {msg: err});
        });
    });
});

/* DELETE a to-do entry */
router.delete('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);
    let id = req.params.id;

    collection.remove({_id: id}, function (err, todo) {
        res.send((err == null) ? {msg: 'success'} : {msg: err});
    });
});


/* DELETE all todos */
router.delete('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    collection.remove({}, function(err, todo) {
        res.send((err == null) ? {msg: 'success'} : {msg: err});
    });
});

/* GET all todos */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    collection.find({}, function(err, todos) {
        res.send((err == null) ? todos : {msg: err});
    });
});

/* GET done todos */
router.get('/done', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    collection.find({"done" : true}, function(err, todos) {
        res.send((err == null) ? todos : {msg: err});
    });
});

/* GET not done todos */
router.get('/not-done', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    collection.find({"done" : false}, function(err, todos) {
        res.send((err == null) ? todos : {msg: err});
    });
});

/* RETRIEVE a to-do entry
*   This has to go after other get as otherwise the server will assume anything after a slash is an id
* */
router.get('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);
    let id = req.params.id;

    collection.findOne({'_id':id}, function(err, todo) {
        res.send((err == null) ? todo : {msg: err});
    });
});

module.exports = router;