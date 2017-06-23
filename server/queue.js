require('dotenv').config();
const kue = require('kue');

const q = kue.createQueue({
  redis: process.env.REDIS_URL
});

q.on('job enqueue', (id, type) => {
  console.log('Job enqueued: ', id, type);
});

q.on('job start', (id, result) => {
  console.log('Job start: ', id, result);
});

q.on('job complete', (id, result) => {
  console.log('Job complete: ', id, result);
});

q.on('job remove', (id) => {
  console.log('Job removed: ', id);
});

q.on('job failed', (error) => {
  console.log('Job failed: ', error);
});

module.exports = q;