const db = require('../db/queries.js');
const htmlfetcher = require('./../worker/htmlfetcher.js');

module.exports = {
  get: (req, res) => {
    var searchQuery = req.params.id;
    db.searchUrlByJobId(searchQuery)
      .then(results => {
        if (results.length === 0) {
          throw error;
        } else {
          return db.isUrlArchived(results[0].url);
        }
      })
      .then(results => {
        var result = results[0].result;
        if (Number.isInteger(parseInt(result))) {
          res.status(200).json(`Robots are currently working on your request. Please check back later (Job Id: ${result}).`);
        } else {
          res.status(200).send(htmlfetcher.serveHtml(result));
        }
      })
      .catch(error => {
        res.status(404).send('Invalid job id');
      })
  },
  post: (req, res) => {
    let searchQuery = req.query.url;
    db.searchUrlByUrl(searchQuery)
      .then(results => {
        console.log(results, "RESULTS 1");
        if (results.length === 0) {
          return db.addUrl(searchQuery);
        } else {
          return db.isUrlArchived(results[0].url);
        }
      })
      .then(results => {
        var result = results[0].result;
        if (Number.isInteger(parseInt(result))) {
          res.status(201).send(`Robots are currently working on your request. Please check back later (Job Id: ${result}).`);
        } else {
          res.status(201).send(htmlfetcher.serveHtml(result));
        }
      })
      .catch(error => {
        console.log(error)
        res.status(404).send(error);
      })

  }
}