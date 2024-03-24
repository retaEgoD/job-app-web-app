import dotenv from 'dotenv';
import { createPool } from "mysql2";
import Logger from './logger'
dotenv.config()

const state = {
    pool: null as any
};

const connect = async (): Promise<void> => {
    try {
        
        state.pool = await createPool({
            connectionLimit: 100,
            multipleStatements: true,
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });
    
        // Check connection is working
        state.pool.getConnection((err: any, connection: any) => {
            if (err) {
                Logger.error(`Unable to connect to database: ${err.message}`);
                process.exit(1); // Exit if process fails.
            } else {
                connection.release() // Release connection if succeeds.
                Logger.info(`Successfully connected to database.`);
            }
        });
        
    } catch (err: any) {

        Logger.error(`Unable to connect to database: ${err.message}`);
        process.exit(1);
    }
}

const getPool = () => {
    return state.pool;
}


export {connect, getPool}
