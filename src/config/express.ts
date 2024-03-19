import express from "express";
import bodyParser from "body-parser";


export default () => {
    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.raw({type: 'text/plain'}));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
    });

    // Routes
    require('../app/routes/users');
    require('../app/routes/jobs');

    return app;
}