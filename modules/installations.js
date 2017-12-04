/*
 * Copyright 2017 Hicham Laroussi-Hassani.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var db = require('./db.js');

/**
 * Renvoie la liste des installations en mauvaise condition.
 * Pour chaque installation, on indique toute l'information connue.
 * La liste est triée en ordre croissant du nom de l'installation
 * Callback renvoie l'erreur ou la response.
 */
module.exports.getInstallations = function (callback) {
    db.getConnection(function (err, db) {
        db.collection('installation', function (err, installation) {
            if (err) {
                return callback(err, null);
            } else {
                installation.find({"condition": "mauvaise"}, {_id: 0}).sort({nom: 1}).toArray(function (err, installationList) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, installationList);
                    }
                });
            }
        });
    });
}