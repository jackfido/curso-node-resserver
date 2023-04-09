const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Database ready'.green)
    } catch (error) {
        console.log(`${error}`.red);
        throw new Error('Database init error.');
    }
};


module.exports = {
    dbConnection
};