const db = require('../data/db-config.js');

function find() {
  return db('schemes')
}
module.exports = {
  find,
}