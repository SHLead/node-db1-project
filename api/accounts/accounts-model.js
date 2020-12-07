const db = require('../../data/dbConfig');

module.exports = {
  getAll() {
    return db('accounts');
  },
  getById(id) {
    return db('accounts').where({ id });
  },
  create(post) {
    return db('accounts')
      .insert(post)
      .then(([id]) => {
        return db('posts')
          .where('id', id)
          .first();
      });
  },
  update(id, post) {
    return db('accounts')
      .where('id', id)
      .update(post);
  },
  delete(id) {
    return db('accounts')
      .where('id', id)
      .del();
  }
};
