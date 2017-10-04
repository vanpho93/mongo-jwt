const express = require('express');
const bodyParser = require('body-parser');

const { Todo } = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todo', (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text });
  todo.save()
  .then(doc => res.send(doc))
  .catch(err => res.status(400).send(err));
});

app.get('/todo', (req, res) => {
  Todo.find({})
  .then(todos => res.send({ todos }))
  .catch(error => res.status(400).send({ error: error.message }));
});

app.get('/todo/:id', (req, res) => {
  Todo.findById(req.params.id)
  .then(todo => res.send(todo))
  .catch(() => res.status(404).send({}));
});

app.delete('/todo/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
  .then(todo => {
    if (!todo) return res.status(404).send();
    res.send(todo);
  })
  .catch(() => res.status(404).send());
});

app.patch('/todo/:id', (req, res) => {
  const { text, completed } = req.body;
  Todo.findById(req.params.id)
  .then(todo => {
    if (!todo) return res.status(404).send();
    const completedFirstTime = todo.completed === false && completed === true;
    if (completedFirstTime) todo.completedAt = Date.now();
    if (completed === true || completed === false) todo.completed = completed;
    if (text) todo.text = text;
    return todo.save();
  })
  .then((todoSaved) => res.send(todoSaved))
  .catch(err => res.status(404).send({ err: err.message }));
});

app.listen(3000, () => console.log('Started on port 3000'));

module.exports = { app };
