/*
 * Copyright 2017 Hicham Laroussi.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var request = require('request');
var xml2js = require('xml2js');
const csv = require('csvtojson');
var crud = require('./crud.js');


/**
 * Revoie les nouvelles installations en appliquant un filtre entre les données 
 * de la ville de Montréal et les données de notre base de données.
 * @param {requestCallback} callback - Le callback qui renvoie la response.
 */
exports.getNewInstallations = function (url, dataType, callback) {
    getMontrealInstallations(url, dataType, function (MontrealInstallations) {
        crud.getAllInstallations(function (listeInstallations) {
        listeInstallations.forEach(function (element) {
          MontrealInstallations = MontrealInstallations.filter(function (installation) {
            return JSON.stringify(installation) !== JSON.stringify(element);
          });
        });
        callback(MontrealInstallations);
      });
    });
  }

/**
 * Revoie tous les installations de la ville de Montréal.
 */
var getMontrealInstallations = function (url, dataType, callback) {

    var options = {
        'url': url,
        'method': 'get',
        'encoding': null
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (dataType == "xml") {
                xmlToJson(body, function (installationsDeMontreal) {
                    callback(installationsDeMontreal);
                });
            }else{
                csvToJson(body, function (installationsDeMontreal) {
                    callback(installationsDeMontreal);
                  });
            }

        }
    });
}

/**
 * Transforme les données XML de la ville de Montréal en JSON.
 * @param {String} body - Les installations de la ville de Montréal.
 * @param {requestCallback} callback - Le callback qui renvoie la response.
 */
var xmlToJson = function (body, callback) {

    var parser = new xml2js.Parser({ ignoreAttrs: true, explicitArray: false });
    parser.parseString(body, function (err, res) {
        var result = JSON.stringify(res);
        var jsonObject = JSON.parse(result);
        jsonObject = formatData(jsonObject);
        callback(jsonObject);
    });
}


/**
* Transforme les données CSV de la ville de Montréal en JSON.
*/
var csvToJson = function (body, callback) {
    var chunks = [];
    csv()
        .fromString(body)
        .on("json", (chunk) => {
            chunks.push(chunk);
        })
        .on('done', (error) => {
            var jsonObject = formatDataPiscines(chunks);
            callback(jsonObject);
        });

}

/**
 * Formater les données selon un format spécifique. 
 * Remplace le format String des dates en format ISO8601 pour Toutes les installations.
 */
function formatData(installations) {
    var firstProp;
    var key;
    for(key in installations) {
        if(installations.hasOwnProperty(key)) {
            firstProp = installations[key];
            break;
        }
    }
    installations = firstProp[key.slice(0, -1)].reduce(function (all, installation, index) {
      all.push({
        typeInstallation: key.slice(0, -1),
        nom: installation.nom,      
        arrondissement: installation.arrondissement.nom_arr, 
        cle: installation.arrondissement.cle,
        date_maj: new Date(installation.arrondissement.date_maj),
        ouvert: installation.ouvert,
        deblaye: installation.deblaye,
        arrose: (installation.arrose ? installation.arrose : "" ),
        resurface: (installation.resurface ? installation.resurface : ""),
        condition: installation.condition,
        ID_UEV: "",
        TYPE: "",
        ADRESSE: "",
        PROPRIETE: "",
        GESTION: "",
        POINT_X: "",
        POINT_Y: "",
        EQUIPEME: "",
        LONG: "",
        LAT: ""
      });
      return all;
    }, []);
  
    return installations;
  }

  /**
 * Formater les données Piscines selon un format spécifique.
 */
function formatDataPiscines(piscines) {
    piscines = piscines.reduce(function (all, piscine, index) {
      all.push({        
        typeInstallation: "piscine",
        nom: piscine.NOM,      
        arrondissement: piscine.ARRONDISSE, 
        cle: "",
        date_maj: "",
        ouvert: "",
        deblaye: "",
        arrose: "",
        resurface: "",
        condition: "",
        ID_UEV: piscine.ID_UEV,
        TYPE: piscine.TYPE,
        ADRESSE: piscine.ADRESSE,
        PROPRIETE: piscine.PROPRIETE,
        GESTION: piscine.GESTION,
        POINT_X: piscine.POINT_X,
        POINT_Y: piscine.POINT_Y,
        EQUIPEME: piscine.EQUIPEME,
        LONG: piscine.LONG,
        LAT: piscine.LAT        
      });
      return all;
    }, []);
  
    return piscines;
  }