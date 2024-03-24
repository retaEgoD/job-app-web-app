import { getPool } from '../../config/db';
import Logger from '../../config/logger';
import { ResultSetHeader } from 'mysql2';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


const register = async (username: string, 
                        firstName: string, 
                        lastName: string, 
                        password: string, 
                        email: string): Promise<ResultSetHeader> => {

    Logger.info('Adding new user to database...');
    const query = 'INSERT INTO users (username, firstname, lastname, password, email)\n'
                + 'VALUES (?, ?, ?, ?, ?);';
    Logger.info(`Running SQL query: \n${query}`);
    const connection = await getPool().getConnection();
    const [result] = await connection.query(query, [username, firstName, lastName, hash(password, 10), email])
    await connection.release();

    Logger.info('User successfully created.');
    return result;
}


const login = async (userId: number, password: string): Promise<string> => {

    Logger.info(`Logging in user with id ${userId}...`);
    const auth = sign({"user_id": userId, "password": password}, process.env.auth_key);
    const query = 'UPDATE user\n'
                + 'SET auth_token = ?\n'
                + 'WHERE user_id = ?;';
    const connection = await getPool().getConnection();
    const [result] = await connection.query(query, [auth, userId]);
    await connection.release();
    
    Logger.info(`Logged in user with id ${userId}.`);
    return auth;

}

const logout = async (userId: number): Promise<void> => {

    Logger.info(`Logging out user with id ${userId}...`);
    const query = 'UPDATE user\n'
                + 'SET auth_token = NULL\n'
                + 'WHERE user_id = ?;';
    const connection = await getPool().getConnection();
    const [result] = await connection.query(query, [userId]);
    await connection.release();
    
    Logger.info(`Logged out user with id ${userId}.`);

}

export { register, login, logout };