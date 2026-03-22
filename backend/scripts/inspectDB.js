import { sql, connectDB } from '../config/db.js';

const inspectDB = async () => {
    try {
        await connectDB();
        const request = new sql.Request();
        
        const tables = ['Patient', 'Department', 'Doctor', 'Staff', 'Token', 'Queue', 'Visit'];
        
        for (const tableName of tables) {
            const result = await request.query(`
                SELECT COLUMN_NAME, DATA_TYPE 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = '${tableName}'
            `);
            console.log(`\nTable: ${tableName}`);
            console.log(result.recordset.map(r => `${r.COLUMN_NAME} (${r.DATA_TYPE})`).join(', '));
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
};

inspectDB();
