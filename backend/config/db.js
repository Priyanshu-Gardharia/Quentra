import sql from 'mssql/msnodesqlv8.js';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=yes;`
};

const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('SQL Server Database Connected Successfully (Windows Auth)');
        
        // Optional: Simple test query
        const result = await sql.query`SELECT 1 as result`;
        if (result.recordset[0].result === 1) {
             console.log('Database test query successful.');
        }

    } catch (err) {
        console.error('Database Connection Error:', err.message);
        process.exit(1);
    }
};

export { sql, connectDB };
