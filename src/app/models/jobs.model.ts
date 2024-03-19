import { getPool } from '../../config/db';
import Logger from '../../config/logger';
// import { ResultSetHeader } from 'mysql2';



const viewAll = async (userId: number): Promise<Job[]> => {
        Logger.info(`Getting all jobs for user ${userId}...`);
        const conn = await getPool().getConnection();
        const query = "SELECT * FROM job_applications WHERE userId = ?";
        Logger.info(query);
        const binds = [userId];
        const [rows] = await conn.query(query, binds);
        await conn.release();
        return rows;
}

export { viewAll }