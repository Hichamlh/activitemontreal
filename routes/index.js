/*
 * Copyright 2017 Hicham Laroussi-Hassani.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
