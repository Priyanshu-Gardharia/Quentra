import { sql } from '../config/db.js';

// @desc    Register a new patient or retrieve existing by mobile
// @route   POST /api/patient/register
export const registerPatient = async (req, res) => {
    try {
        const { patient_name, mobile_number, dob, address, mha_no } = req.body;

        if (!patient_name || !mobile_number) {
            return res.status(400).json({ success: false, message: 'Patient name and mobile number are required.' });
        }

        // Check if patient exists
        const request = new sql.Request();
        request.input('mobile', sql.VarChar, mobile_number);
        
        const existing = await request.query(`SELECT * FROM Patient WHERE mobile_no = @mobile`);
        
        if (existing.recordset.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Patient retrieved successfully',
                data: existing.recordset[0]
            });
        }

        // Insert new patient
        request.input('name', sql.VarChar, patient_name);
        request.input('dob', sql.Date, dob || null);
        request.input('address', sql.VarChar, address || null);
        request.input('mha_no', sql.VarChar, mha_no || null);
        
        const result = await request.query(`
            INSERT INTO Patient (p_name, mobile_no, dob, address, mha_no) 
            OUTPUT INSERTED.*
            VALUES (@name, @mobile, @dob, @address, @mha_no)
        `);

        res.status(201).json({
            success: true,
            message: 'Patient registered successfully',
            data: result.recordset[0]
        });

    } catch (error) {
        console.error('Error in registerPatient:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Generate a new queue token
// @route   POST /api/tokens/generate
export const generateToken = async (req, res) => {
    try {
        const { p_id, dep_id, doctor_id, visit_type, priority, notes } = req.body;

        if (!p_id || !dep_id || !visit_type) {
            return res.status(400).json({ success: false, message: 'p_id, dep_id, and visit_type are required.' });
        }

        await connectDB();
        const request = new sql.Request();
        
        // 1. Calculate daily token_no
        request.input('dep_id', sql.Int, dep_id);
        const tokenNoResult = await request.query(`
            SELECT ISNULL(MAX(token_no), 0) + 1 as next_token 
            FROM Token 
            WHERE dep_id = @dep_id AND token_date = CAST(GETDATE() AS DATE)
        `);
        const token_no = tokenNoResult.recordset[0].next_token;

        // 2. Calculate queue_position (FIFO)
        const qPosResult = await request.query(`
            SELECT ISNULL(MAX(queue_position), 0) + 1 as next_pos 
            FROM Token 
            WHERE dep_id = @dep_id AND token_date = CAST(GETDATE() AS DATE)
        `);
        const queue_position = qPosResult.recordset[0].next_pos;

        // Make visit_type contain priority info if urgent, or we just rely on order in GET
        const actual_visit_type = priority === 'urgent' ? 'urgent' : visit_type;

        // 3. Insert Token
        request.input('token_no', sql.Int, token_no);
        request.input('p_id', sql.Int, p_id);
        request.input('doctor_id', sql.Int, doctor_id || null);
        request.input('visit_type', sql.VarChar, actual_visit_type);
        request.input('queue_pos', sql.Int, queue_position);
        
        const tokenInsert = await request.query(`
            INSERT INTO Token (token_no, p_id, dep_id, doctor_id, visit_type, queue_position, est_wait_time, created_at, token_date, status)
            OUTPUT INSERTED.*
            VALUES (@token_no, @p_id, @dep_id, @doctor_id, @visit_type, @queue_pos, 15, GETDATE(), CAST(GETDATE() AS DATE), 'waiting')
        `);
        
        const newToken = tokenInsert.recordset[0];

        // 4. Insert Visit Record
        request.input('token_id', sql.Int, newToken.token_id);
        request.input('notes', sql.Text, notes || '');
        await request.query(`
            INSERT INTO Visit (p_id, token_id, visit_type, notes, visit_date)
            VALUES (@p_id, @token_id, @visit_type, @notes, CAST(GETDATE() AS DATE))
        `);

        // 5. Update strictly the Queue table metrics
        await request.query(`
            UPDATE Queue 
            SET total_waiting = (SELECT COUNT(*) FROM Token WHERE dep_id = @dep_id AND status = 'waiting' AND token_date = CAST(GETDATE() AS DATE))
            WHERE dep_id = @dep_id AND queue_date = CAST(GETDATE() AS DATE)
            
            IF @@ROWCOUNT = 0
            BEGIN
                INSERT INTO Queue (dep_id, total_waiting, queue_date, is_active)
                VALUES (@dep_id, 1, CAST(GETDATE() AS DATE), 1)
            END
        `);

        res.status(201).json({
            success: true,
            message: 'Token generated successfully',
            data: newToken
        });

    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get queue status string for a department
// @route   GET /api/queue/status
export const getQueueStatus = async (req, res) => {
    try {
        const { dep_id } = req.query;
        if (!dep_id) {
            return res.status(400).json({ success: false, message: 'dep_id query parameter is required.' });
        }

        await connectDB();
        const request = new sql.Request();
        request.input('dep_id', sql.Int, dep_id);

        const result = await request.query(`
            SELECT 
                q.total_waiting,
                q.current_token as current_serving_token_id,
                t.token_no as current_serving_number,
                (SELECT COUNT(*) FROM Token WHERE dep_id = @dep_id AND status = 'completed' AND token_date = CAST(GETDATE() AS DATE)) as completed_today,
                ISNULL((SELECT AVG(DATEDIFF(MINUTE, created_at, GETDATE())) FROM Token WHERE status = 'waiting' AND dep_id = @dep_id AND token_date = CAST(GETDATE() AS DATE)), 0) as avg_wait_time
            FROM Queue q
            LEFT JOIN Token t ON q.current_token = t.token_id
            WHERE q.dep_id = @dep_id AND q.queue_date = CAST(GETDATE() AS DATE)
        `);

        // Fetch waiting list prioritizing 'urgent' visits, then FIFO by queue_position
        const queueList = await request.query(`
            SELECT t.token_id, t.token_no, t.queue_position, t.visit_type, p.p_name as patient_name
            FROM Token t
            JOIN Patient p ON t.p_id = p.p_id
            WHERE t.dep_id = @dep_id AND t.status = 'waiting' AND t.token_date = CAST(GETDATE() AS DATE)
            ORDER BY 
                CASE WHEN t.visit_type = 'urgent' THEN 1 ELSE 2 END,
                t.queue_position ASC
        `);

        res.status(200).json({
            success: true,
            summary: result.recordset[0] || { total_waiting: 0, current_serving_token_id: null, current_serving_number: null, avg_wait_time: 0 },
            waiting_list: queueList.recordset
        });

    } catch (error) {
        console.error('Error fetching queue status:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Update a specific token's status
// @route   PUT /api/tokens/:id/status
export const updateTokenStatus = async (req, res) => {
    try {
        const token_id = req.params.id;
        const { status } = req.body; // 'serving', 'completed', 'cancelled'

        if (!status) {
            return res.status(400).json({ success: false, message: 'status is required.' });
        }

        await connectDB();
        const request = new sql.Request();
        request.input('token_id', sql.Int, token_id);
        request.input('status', sql.VarChar, status);

        // Update Token 
        const tokenResult = await request.query(`
            UPDATE Token 
            SET status = @status 
            OUTPUT INSERTED.dep_id
            WHERE token_id = @token_id
        `);

        if (tokenResult.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Token not found.' });
        }

        const dep_id = tokenResult.recordset[0].dep_id;
        request.input('dep_id', sql.Int, dep_id);

        // Update Queue appropriately
        if (status === 'serving') {
            await request.query(`
                UPDATE Queue 
                SET current_token = @token_id,
                    total_waiting = (SELECT COUNT(*) FROM Token WHERE dep_id = @dep_id AND status = 'waiting' AND token_date = CAST(GETDATE() AS DATE))
                WHERE dep_id = @dep_id AND queue_date = CAST(GETDATE() AS DATE)
            `);
        } else if (status === 'completed' || status === 'cancelled') {
            await request.query(`
                UPDATE Queue 
                SET current_token = NULL,
                    total_waiting = (SELECT COUNT(*) FROM Token WHERE dep_id = @dep_id AND status = 'waiting' AND token_date = CAST(GETDATE() AS DATE))
                WHERE dep_id = @dep_id AND queue_date = CAST(GETDATE() AS DATE)
            `);
        }

        res.status(200).json({
            success: true,
            message: `Token status safely updated to ${status}`
        });

    } catch (error) {
        console.error('Error updating token status:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
