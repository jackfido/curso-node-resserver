const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.userRoutesPath = '/api/users';
        // this.authPath = '/api/auth';
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
            products: '/api/products',
            search: '/api/search'
        };

        //connect to BD
        this.dbConn();
        //Midlewares
        this.midlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    routes() {
        /*this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userRoutesPath, require('../routes/users'));*/
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
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