/*
 * Copyright 2017 Hicham Laroussi-Hassani.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var express = require('express');
var router = express.Router();
var db = require('../modules/db.js');

router.get('/', function (req, res) {
    db.getConnection(function (err, db) {
        db.collection('installation', function (err, installation) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                installation.distinct("nom", (function (err, result) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.json(result.sort());
                    }
                }));
            }
        });
    });
});

module.exports = router;