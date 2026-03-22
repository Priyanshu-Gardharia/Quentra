import { sql, connectDB } from '../config/db.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        await connectDB();
        const request = new sql.Request();
        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);

        // Check if user exists in Staff table
        const result = await request.query(`
            SELECT staff_id, s_name as name, role, dep_id 
            FROM Staff 
            WHERE email = @email AND password = @password AND is_active = 1
        `);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            
            // If they are a doctor, fetch their doctor_id
            if (user.role.toLowerCase() === 'doctor') {
                const docResult = await request.query(`
                    SELECT doctor_id FROM Doctor WHERE staff_id = ${user.staff_id}
                `);
                if (docResult.recordset.length > 0) {
                    user.doctor_id = docResult.recordset[0].doctor_id;
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: user
            });
        }

        // If not found
        res.status(401).json({ success: false, message: "Invalid email or password" });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};
