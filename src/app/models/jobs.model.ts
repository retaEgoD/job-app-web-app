

const viewAll = async (): Promise<> => {
Logger.info('Getting films...');
const conn = await getPool().getConnection();
const query = "SELECT * FROM job_applications";
Logger.info(query);
// const searchTermBind = (typeof searchTerm !== 'undefined') ? '%' + searchTerm + '%' : undefined;
// const binds = [searchTermBind, searchTermBind, genreIds, ageRatings, directorId, reviewerId].filter(x => x !== undefined);
const [rows] = await conn.query(query, []);
await conn.release();
return rows;
}