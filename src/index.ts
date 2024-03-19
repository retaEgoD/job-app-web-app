import dotenv from 'dotenv';
import {connect, getPool} from "./config/db";
import express from './config/express';
import Logger from "./config/logger";

// const userRoutes = require('./routes/user');

dotenv.config()

const app = express();

async function main() {
    await connect();
    const pool = getPool();

    // app.use('/user', userRoutes);
    app.get('/', (req, res) => {
        res.send('<h1>Hello, this works. AAAAAAAAAAAAAAA<h1>');
    });

    const port = process.env.port

    app.listen(port, () => {
        Logger.info(`Node.js HTTP server is running on port ${port}`);
    });

};

main();