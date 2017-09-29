const assert = require('assert');
const request = require('supertest');

const { Todo } = require('../models/todo');
const { app } = require('../server');

const post = (url, body) => request(app).post(url).send(body);

describe('Add new todo', () => {
    it('Can add new todo with text', async () => {
        const res = await post('/todo', { text: 'Turn on the phone' });
        assert.equal(res.status, 200);
        assert.equal(res.body.text, 'Turn on the phone');

        const todo = await Todo.findOne({});
        const todoCount = await Todo.count();
        assert.equal(todo.text, 'Turn on the phone');
        assert.equal(todoCount, 1);
    });

    it('Cannot create new todo if text is empty', async () => {
        const res = await post('/todo', { text: '' });
        assert.equal(res.status, 400);
        const todoCount = await Todo.count();
        assert.equal(todoCount, 0);
    });
});
