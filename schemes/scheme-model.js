const db = require('../data/db-config.js');

function find() {
  return db('schemes')
}

function findById(id) {
  // first() returns the first entry in the db matching the query
  return db('users')
    .where({ id })
    .first()
}

function add(newScheme) {
  return db('schemes')
    .insert(newScheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(updatedScheme, id) {
  return db('schemes')
  .where({ id })
  .update(updatedScheme);
}

function remove(id) {
  return db('schemes')
  .where('id', id)
  .del();
}

module.exports = {
  find,
  findById, 
  add, 
  update, 
  remove
}