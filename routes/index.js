var express = require('express');
var router = express.Router();
var Promise = require('rsvp')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
var dbo;

// Database Name
const dbName = 'mng';

// Use connect method to connect to the server

var HAVO_diploma;
var HAVO_p;
var HAVO_h;
var MBO_diploma;
var MBO_p;
var MBO_h;
var OVERIG_diploma;
var OVERIG_p;
var OVERIG_h;

function slaging(id, query_id) {
    return MongoClient.connect(url).then(function (db) {
        dbo  = db.db("mng");
        var collection = dbo.collection('data');
        if(query_id == 1){
            var query = {soort_vo: id ,statusnu: "Diploma"}
            collection.count(query).then(function (data) {
                if(id = "HAVO") {
                    HAVO_diploma = data;
                }
                if(id = "MBO") {
                    MBO_diploma = data;
                }
                if(id = "OVERIG") {
                    OVERIG_diploma = data;
                }
            })
            return collection.count(query);

        }
        if(query_id == 2){
            var query = {soort_vo: id ,statusnu: "Uitval in P"}
            collection.count(query).then(function (data) {
                if(id = "HAVO") {
                    HAVO_p = data;
                }
                if(id = "MBO") {
                    MBO_p = data;
                }
                if(id = "OVERIG") {
                    OVERIG_p = data;
                }
            })
            return collection.count(query);

        }
        if(query_id == 3){
            var query = {soort_vo: id ,statusnu: "Uitval in H"}
            collection.count(query).then(function (data) {
                if(id = "HAVO") {
                    HAVO_h = data;
                }
                if(id = "MBO") {
                    MBO_h = data;
                }
                if(id = "OVERIG") {
                    OVERIG_h = data;
                }
            })
            return collection.count(query);

        }

    }).then(function (data) {
        return data;
    })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Home');
});

router.get('/slaging/:id', function(req, res){
    var id = req.params.id
    for(var i = 1; i < 4; i++){
        slaging(id, i).then(function (data) {
        })
    }
    if(id == "HAVO") {
        var totaal = (HAVO_diploma) / (HAVO_diploma + HAVO_p + HAVO_h) * 100
        res.send(JSON.stringify(totaal));
    }
    if(id == "MBO") {
        var totaal1 = (MBO_diploma) / (MBO_diploma + MBO_p + MBO_h) * 100
        res.send(JSON.stringify(totaal1));
    }
    if(id == "OVERIG") {
        var totaal2 = (OVERIG_diploma) / (OVERIG_diploma + OVERIG_p + OVERIG_h) * 100
        res.send(JSON.stringify(totaal2));
    }
});



module.exports = router;
