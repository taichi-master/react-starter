const express = require('express'),
      router = express.Router(),
      url = require('url');

const getFeatures = require('./getFeatures');

router.get('/', function (req, res, next) {
  var url_parts = url.parse(req.url, true),
      { index }= url_parts.query;

  getFeatures((err, features) => {
    if (err)
      res.status(500).send(err);
    res.json(features);
  })
});

router.post('/', function (req, res, next) {
  var { index } = req.body;

  getFeatures((err, features) => {
    if (err)
      res.status(500).send(err);
    res.json(features);
  })
});

module.exports = router;
