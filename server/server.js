const express = require('express');
const bodyParser = require('body-parser');

const { Todo } = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text });
  todo.save()
  .then(doc => res.send(doc))
  .catch(err => res.status(400).send(err));
});

app.listen(3000, () => console.log('Started on port 3000'));

module.exports = { app };
