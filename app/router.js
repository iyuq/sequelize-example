'use strict';

module.exports = app => {
  app.get('/users', 'user.users');
  app.get('/users/:id', 'user.user');
  app.post('/users', 'user.create');
  app.put('/users/:id', 'user.update');
  app.del('/users/:id', 'user.del');
};
