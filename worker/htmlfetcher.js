const fs = require('fs');
const request = require('request');
const path = require('path');

const paths = {
  archivedSites: path.join(__dirname, '../archives/sites')
};

module.exports = {
  downloadUrls: function(url) {
    return new Promise ((resolve, reject) => {
      resolve(request('http://' + url).pipe(fs.createWriteStream(paths.archivedSites + '/' + url + '.html')));
    })
    .catch(error => {
      reject(error);
    })
  },
  serveHtml: function(url) {
    return fs.readFileSync(`${paths.archivedSites}/${url}`, 'utf8')
    // return new Promise ((resolve, reject) => {
    //   fs.readFile(`${paths.archivedSites}/${url}`, 'utf8', (err, result) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(result);
    //     }
    //   });
    // })
  }
}