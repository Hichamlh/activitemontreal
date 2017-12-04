/*
 * Copyright 2017 Hicham Laroussi.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var express = require('express');
var router = express.Router();
var db = require('../modules/db.js');

router.get('/', function (req, res) {
    var nom = req.query.nom;
    if (!nom) {
        res.sendStatus(400);
    } else {
        db.getConnection(function (err, db) {
            db.collection('installation', function (err, installation) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    installation.findOne({"nom": nom}, function (err, docs) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            if (!docs) {
                                res.sendStatus(404);
                            } else {
                                res.json(docs);
                            }
                        }
                    });
                }
            });
        });
    }
});

module.exports = router;