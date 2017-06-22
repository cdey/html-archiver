const db = require('../db/queries.js');
const htmlfetcher = require('../worker/htmlfetcher.js');

module.exports.search = (req, res) => {
  var searchQuery = req.body.searchQuery;

  if (Number.isInteger(parseInt(searchQuery))) {
    console.log("It's a number");
    db.searchUrlByJobId(searchQuery)
      .then(results => {
        console.log(results, "RESULTS 1")
        if (results.length === 0) {
          throw error;
        } else {
          return db.isUrlArchived(results[0].url);
        }
      })
      .then(results => {
        console.log(results, "RESULTS 2")
        var result = results[0].result;
        if (Number.isInteger(parseInt(result))) {
          res.status(201).send(`Robots are currently working on your request. Please check back later (Job Id: ${result})`);
        } else {
          res.status(201).send(`${result}`);
        }
      })
      .catch(error => {
        res.status(404).send('Invalid job id');
      })
  } else {
    console.log("It's a string");
    db.searchUrlByUrl(searchQuery)
      .then(results => {
        console.log(results, "RESULTS 1");
        if (results.length === 0) {
          htmlfetcher.downloadUrls(searchQuery);
          return db.addUrl(searchQuery);
        } else {
          return db.isUrlArchived(results[0].url);
        }
      })
      .then(results => {
        console.log(results, "RESULTS 2")
        var result = results[0].result;
        if (Number.isInteger(parseInt(result))) {
          res.status(201).send(`Robots are currently working on your request. Please check back later (Job Id: ${result})`);
        } else {
          res.status(201).send(`${result}`);
        }
      })
      .catch(error => {
        console.log(error)
        res.status(404).send(error);
      })
  }
}

