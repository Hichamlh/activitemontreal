/*
 * Copyright 2017 Hicham Laroussi.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var cron = require('node-cron');
var installations = require('./retrieveFromMontreal.js');
var crud = require('./crud.js');



/**
 * Importation de données de la ville de Montréal qui s'execute automatiquement chaque jour à minuit.
 */
cron.schedule('0 0 * * *', function () {

  console.log('Lancement de l\'importation automatique de données');

  var url = 'http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml';
  installations.getNewInstallations(url, "xml", function (newPatinoire) {
    crud.insertInstallations(newPatinoire, function (err, patinoire) {
      if (err) {
        console.log('échec lors de la connexion au serveur mongodb');
      } else {
        console.log(patinoire.length + ' nouvelles patinoires inserées dans la base de données');
      }
    });
  });

  url = 'http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml';
  installations.getNewInstallations(url, "xml", function (newGlissade) {
    crud.insertInstallations(newGlissade, function (err, glissade) {
      if (err) {
        console.log('échec lors de la connexion au serveur mongodb');
      } else {
        console.log(glissade.length + ' nouvelles glissades inserées dans la base de données');
      }
    });
  });

  url = 'http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv';
  installations.getNewInstallations(url, "csv", function (newPiscine) {
    crud.insertInstallations(newPiscine, function (err, piscine) {
      if (err) {
        console.log('échec lors de la connexion au serveur mongodb');
      } else {
        console.log(piscine.length + ' nouvelles piscines inserées dans la base de données');
      }
    });
  });


  
});