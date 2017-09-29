const assert = require('assert');
const request = require('supertest');

const { Todo } = require('../models/todo');
const { app } = require('../server');

const get = (url) => request(app).get(url);

describe('Get all todos', () => {
    beforeEach('Create some todos for testing', async () => {
        const t1 = new Todo({ text: 'aaa' });
        const t2 = new Todo({ text: 'bbb' });
        const t3 = new Todo({ text: 'ccc' });
        const promises = [t1.save(), t2.save(), t3.save()];
        await Promise.all(promises);
    });

    it('Can get all todos', async () => {
        const res = await get('/todo');
        assert.equal(res.status, 200);
        assert.equal(res.body.todos.length, 3);

        const todos = await Todo.find();
        assert.equal(todos.length, 3);
        assert.equal(todos[0].text, 'aaa');
    });
});
