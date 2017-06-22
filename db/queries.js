const db = require('./index.js');

const query = function(searchQuery) {
  return new Promise ((resolve, reject) => {
    db.query(searchQuery, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  findNotArchived: () => {
    return query(`SELECT url FROM jobs WHERE archived=0`)
  },
  searchUrlByUrl: (searchUrl) => {
    return query(`SELECT url FROM jobs WHERE url=LOWER('${searchUrl}')`)
  },
  searchUrlByJobId: (jobId) => {
    return query(`SELECT url FROM jobs WHERE id=${jobId}`)
  },
  isUrlArchived: (url) => {
    return query(`SELECT IF(archived, filepath, id) as result FROM jobs WHERE url='${url}'`)
  },
  updateArchived: (url, filepath) => {
    return query(`UPDATE jobs SET archived=1, filepath='${filepath}' WHERE url='${url}'`)
  },
  addUrl: (url) => {
    return query(`INSERT INTO jobs (url) VALUES (LOWER('${url}'))`)
      .then(result => {
        return query(`SELECT id as result FROM jobs WHERE url='${url}'`)
      })
      // .catch(error => {
      //   console.log(error)
      // })
  }
}