const { Todo } = require('../models/todo');
const { User } = require('../models/user');

beforeEach('Remove all data before each test case', async () => {
    await Todo.remove({});
    await User.remove({});
});
