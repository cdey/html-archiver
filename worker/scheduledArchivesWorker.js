const cron = require('node-cron');
const q = require('../server/queue.js');
const db = require('../db/queries.js');
const htmlfetcher = require('./htmlfetcher.js');

const SCHEDULED_ARCHIVING = 'scheduled_archiving';

const addToQueue = (url) => (
  new Promise((resolve, reject) => {
    q.create(SCHEDULED_ARCHIVING, {
      url: url,
      type: 'scheduled_archiving'
    }).removeOnComplete(true).save((error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve('Success');
      }
    });
  })
);

module.exports = cron.schedule('1 * * * * *', () => {
  console.log('ScheduledArchivesWorker Running...');

  db.findNotArchived()
    .then(results => {
      results.forEach(result => {
        addToQueue(result.url);
      })
    })
    .then(() => {
      q.process(SCHEDULED_ARCHIVING, (job, done) => {
        htmlfetcher.downloadUrls(job.data.url)
          .then(() => {
            return db.updateArchived(job.data.url, `${job.data.url}.html`);
          })
          .then(() => {
            done();
          });
      });
    })
    .catch((error) => {
      console.error(error);
    });
}, false);