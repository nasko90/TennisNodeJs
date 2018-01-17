var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = 'mongodb://localhost:27017';
var session = require("express-session");

/* GET addNewGame page. */
router.get('/', function(req, res) {
    if (!req.session.user){
        res.render('login');
    } else{
        res.render('addNewGame');
    }
});

module.exports = router;
