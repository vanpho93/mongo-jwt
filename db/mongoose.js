const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const getDatabaseUri = () => {
    console.log(process.env.NODE_ENV);
    const isTesting = process.env.NODE_ENV === 'test';
    const testDbUri = 'mongodb://localhost:27017/TodoAppTest';
    const productionDbUri = 'mongodb://localhost:27017/TodoApp';
    return isTesting ? testDbUri : productionDbUri;
};

mongoose.connect(getDatabaseUri(), { useMongoClient: true });
module.exports = { mongoose };
