const assert = require('assert');
const request = require('supertest');

const { Todo } = require('../models/todo');
const { app } = require('../server');

const remove = (url) => request(app).delete(url);

describe('Delete todo by id', () => {
    let todoId;
    beforeEach('Create some todos for testing', async () => {
        const t1 = new Todo({ text: 'aaa' });
        const t2 = new Todo({ text: 'bbb' });
        const t3 = new Todo({ text: 'ccc' });
        todoId = t2._id;
        const promises = [t1.save(), t2.save(), t3.save()];
        await Promise.all(promises);
    });

    it('Can remove todo with id', async () => {
        const res = await remove('/todo/' + todoId);
        assert.equal(res.status, 200);

        const todos = await Todo.find();
        assert.equal(todos.length, 2);
        assert.equal(todos[1].text, 'ccc');
    });

    it('Can not remove todo with wrong id', async () => {
        const res = await remove('/todo/abc123');
        assert.equal(res.status, 404);

        const todos = await Todo.find();
        assert.equal(todos.length, 3);
    });
});
