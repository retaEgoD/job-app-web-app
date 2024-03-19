import { getPool } from '../../config/db';
import Logger from '../../config/logger';
import { ResultSetHeader } from 'mysql2';


const getUserIdByEmail = async (email: string): Promise<number> => {

    Logger.info(`Retrieving user id with email ${email}...`);
    const connection = getPool().getConnection();
    const query = "SELECT user_id FROM user WHERE email = ?;";
    const [result] = connection.query(query, [email]);
    await connection.release();

    if (result.length === 0) {
        Logger.error(`Error: User with email ${email} does not exist.`);
        return -1;
    }
    const userId = result[0].user_id;
    Logger.info(`User with id ${userId} retrieved.`);
    return userId;

}

const getUser = async (userId: number): Promise<User> => {

    Logger.info(`Retrieving user with id ${userId}...`);
    const connection = getPool().getConnection();
    const query = "SELECT * FROM user WHERE user_id = ?;";
    const [result] = connection.query(query, [userId]);
    await connection.release();

    Logger.info(`User retrieved.`);
    return result[0];

}


const checkAuth = async (auth: string): Promise<boolean> => {

    Logger.info(`Checking authorisation request...`);
    const connection = getPool().getConnection();
    const query = "SELECT * FROM user WHERE auth_token = ?;";
    const [result] = connection.query(query, [auth]);
    await connection.release();

    if (result.length === 0) {
        return false;
    }
    return true;

}


export { getUserIdByEmail, getUser, checkAuth }