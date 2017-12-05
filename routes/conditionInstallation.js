/*
 * Copyright 2017 Hicham Laroussi-Hassani.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var express = require('express');
var router = express.Router();
var installations = require('../modules/installations.js');
var json2csv = require('json2csv');
var js2xmlparser = require('js2xmlparser');

router.get('/json', function (req, res) {
    installations.getInstallations(function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(result);
        }
    });
});

router.get('/xml', function (req, res) {
    installations.getInstallations(function (err, installation) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var resultat = installation;
            var options = {
                wrapArray: {
                    enabled: true
                },
                declaration: {
                    encoding: "UTF-8"
                }
            };
            res.header("Content-Type", "application/xml");
            res.send(js2xmlparser.parse("installations", resultat, options));
        }
    });
});

router.get('/csv', function (req, res) {
    installations.getInstallations(function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.header("Content-Type", "application/csv");
            try {
                var fields = ['typeInstallation', 'nom', 'arrondissement', 'ouvert',
                    'deblaye', 'arrose', 'resurface', 'condition', 'ID_UEV',
                    'TYPE', 'ADRESSE', 'PROPRIETE', 'GESTION', 'POINT_X',
                    'POINT_Y', 'EQUIPEME', 'LONG', 'LAT'];
                res.send(json2csv({data: result, fields: fields}));
            } catch (err) {
                console.log(err);
            }
        }
    });
});

module.exports = router;