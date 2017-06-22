const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const requestHandler = require('./requestHandler.js');
const initialize = require('./initialize.js');
const scheduledArchivesWorker = require('../worker/scheduledArchivesWorker.js');

const app = express();

initialize('./archives');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../archives/sites'))

app.post('/search', requestHandler.search);

var server = app.listen(port, function() {
  console.log(`Magical unicorns will arrive on port ${port}!`);
});

scheduledArchivesWorker.start();