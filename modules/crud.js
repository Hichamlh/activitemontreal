/*
 * Copyright 2017 Hicham Laroussi-Hassani.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var db = require('./db.js');


/**
 * Revoie toutes les installations de la Base de Données.Le callback renvoie la response.
 */
exports.getAllInstallations = function (callback) {
    db.getConnection(function (err, db) {
        db.collection('installation', function (err, installations) {
            if (err) {
                console.log('échec lors de la connexion au serveur mongodb');
            } else {
                installations.find({}, {_id: 0}).toArray(function (err, listeInstallations) {
                    if (err) {
                        console.log('échec lors de l\'importation de données');
                    } else {
                        callback(listeInstallations);
                    }
                });
            }
        });
    });
}

/**
 * Insert les nouvelles installations dans une la Base de Données puis les retourne avec le callback.
 */
exports.insertInstallations = function (installationsList, callback) {
    db.getConnection(function (err, db) {
        db.collection('installation', function (err, installation) {
            if (err) {
                callback(err, null);
            } else {
                if (installationsList.length !== 0) {
                    installation.insert(installationsList);
                }
                callback(null, installationsList);
            }
        });
    });
}
