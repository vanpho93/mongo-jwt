const assert = require('assert');
const request = require('supertest');

const { Todo } = require('../models/todo');
const { app } = require('../server');

const patch = (url, body) => request(app).patch(url).send(body);

describe('Update todo', () => {
    let todoId;

    beforeEach('Create a new todo for test', async () => {
        const todo = new Todo({ text: 'Say hello to everyone.' });
        todoId = todo._id;
        await todo.save();
    });

    it('Can update text of a todo', async () => {
        await patch(`/todo/${todoId}`).send({ text: 'Say goodbye' });
        const todo = await Todo.findById(todoId);
        assert.equal(todo.text, 'Say goodbye');
        assert.equal(todo.completed, false);
        assert.equal(todo.completedAt, null);
    });

    it('Can update completed status of a todo', async () => {
        await patch(`/todo/${todoId}`).send({ completed: true });
        const todo = await Todo.findById(todoId);
        assert.notEqual(null, todo.completedAt);
    });
});
