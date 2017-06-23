const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const requestHandler = require('./requestHandler.js');
const jobsHandler = require('./jobsHandler.js');
const initialize = require('./initialize.js');
const scheduledArchivesWorker = require('../worker/scheduledArchivesWorker.js');
const Queue = require('./queue.js');

const app = express();

initialize('./archives');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../archives/sites'))

app.post('/search', requestHandler.search);
app.get('/jobs/:id', jobsHandler.get);
app.post('/jobs', jobsHandler.post);


var server = app.listen(port, function() {
  console.log(`Magical unicorns will arrive on port ${port}!`);
});

scheduledArchivesWorker.start();