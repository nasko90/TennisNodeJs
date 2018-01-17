var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = 'mongodb://localhost:27017';
var session = require("express-session");

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Express' });
});

router.post('/loginAttempt', function(req, res) {
  var user = {
    name: req.body.username,
    password: req.body.password
  }

  mongoClient.connect(url, function(err, mongoClient){
    assert.equal(err, null);
    var collection = mongoClient.db("Tennis").collection('user');
    collection.find({"name": user.name, "password": user.password}).limit(1).toArray(function(err, result){
      if (result.length == 1){
        mongoClient.close();
        req.session.user = user;
        res.json({success : "Entrie found", status : 200, redirect: "/"});
      } else{
        mongoClient.close();
        res.json({error : "No entrie found", status : 401});
      }
    });
  })
});

module.exports = router;