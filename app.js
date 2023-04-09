require('dotenv').config();
const colors = require('colors');
const Server = require('./models/server.js');

const server = new Server();

server.listen();