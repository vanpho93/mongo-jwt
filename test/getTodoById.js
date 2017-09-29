const assert = require('assert');
const request = require('supertest');

const { Todo } = require('../models/todo');
const { app } = require('../server');

const get = (url) => request(app).get(url);

describe('Get todo by id', () => {
    let todoId;

    beforeEach('Create some todos for testing', async () => {
        const t1 = new Todo({ text: 'aaa' });
        const t2 = new Todo({ text: 'bbb' });
        const t3 = new Todo({ text: 'ccc' });
        todoId = t2._id;
        const promises = [t1.save(), t2.save(), t3.save()];
        await Promise.all(promises);
    });

    it('Can get by id', async () => {
        const res = await get('/todo/' + todoId);
        assert.equal(res.status, 200);
        assert.equal(res.body.text, 'bbb');
    });

    it('Cannot get post with wrong id', async () => {
        const wrongId = '123xyz';
        const res = await get('/todo/' + wrongId);
        assert.equal(res.status, 404);
    });
});
