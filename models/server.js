const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutesPath = '/api/users';

        //connect to BD
        this.dbConn();
        //Midlewares
        this.midlewares();
        //Rutas de mi aplicacion

        this.routes();
    }

    routes() {
        this.app.use(this.userRoutesPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

    async dbConn() {
        await dbConnection();
    }

    midlewares() {
        // CORS
        this.app.use(cors());

        // Read & pars parse body
        this.app.use(express.json());

        // public directory
        this.app.use(express.static('public'));
    }
}

module.exports = Server;