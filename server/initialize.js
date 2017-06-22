var fs = require('fs');

module.exports = function (basePath) {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  if (!fs.existsSync(basePath + '/sites')) {
    fs.mkdirSync(basePath + '/sites');
  }
};
