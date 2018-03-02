module.exports = app => {
  const users = require('../controller/userController.js');
  app.post('/users', users.create);
  app.get('/users/:username', users.findOne);
  app.post('/authenticate', users.authenticate);
};
