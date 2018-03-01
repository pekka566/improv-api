module.exports = function(app) {
  const exercises = require('../controller/exerciseController.js');
  app.post('/exercises', exercises.create);
  app.get('/exercises', exercises.findAll);
  app.get('/exercises/:exerciseId', exercises.findOne);
  app.put('/exercises/:exerciseId', exercises.update);
  app.delete('/exercises/:exerciseId', exercises.delete);
};
