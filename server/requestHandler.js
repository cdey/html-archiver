const db = require('../db/queries.js');

module.exports.search = (req, res) => {
  var searchQuery = req.body.searchQuery;

  if (Number.isInteger(parseInt(searchQuery))) {
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
          res.status(201).json({response: `Robots are currently working on your request. Please check back later (Job Id: ${result}).`, type: 'job id'});
        } else {
          res.status(201).json({response: `${result}`, type: 'filepath'});
        }
      })
      .catch(error => {
        res.status(404).send('Invalid job id');
      })
  } else {
    db.searchUrlByUrl(searchQuery)
      .then(results => {
        if (results.length === 0) {
          return db.addUrl(searchQuery);
        } else {
          return db.isUrlArchived(results[0].url);
        }
      })
      .then(results => {
        var result = results[0].result;
        if (Number.isInteger(parseInt(result))) {
          res.status(201).json({response: `Robots are currently working on your request. Please check back later (Job Id: ${result}).`, type: 'job id'});
        } else {
          res.status(201).json({response: `${result}`, type: 'filepath'});
        }
      })
      .catch(error => {
        console.log(error)
        res.status(404).send(error);
      })
  }
}



