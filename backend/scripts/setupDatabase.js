import { sql, connectDB } from '../config/db.js';

const createTables = async () => {
    try {
        await connectDB();
        console.log("Database connected. Starting schema creation...");

        const request = new sql.Request();

        // Warning: This script does not drop tables automatically to preserve data.
        // It creates them if they do not exist.

        // 1. Department
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Department' and xtype='U')
            BEGIN
                CREATE TABLE Department (
                    dep_id INT IDENTITY(1,1) PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    description VARCHAR(255) NULL,
                    created_at DATETIME DEFAULT GETDATE()
                )
                PRINT 'Department table created.'
            END ELSE PRINT 'Department table already exists.'
        `);

        // 2. Doctor
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Doctor' and xtype='U')
            BEGIN
                CREATE TABLE Doctor (
                    doctor_id INT IDENTITY(1,1) PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    dep_id INT NOT NULL FOREIGN KEY REFERENCES Department(dep_id),
                    is_active BIT DEFAULT 1
                )
                PRINT 'Doctor table created.'
            END ELSE PRINT 'Doctor table already exists.'
        `);

        // 3. Staff
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Staff' and xtype='U')
            BEGIN
                CREATE TABLE Staff (
                    staff_id INT IDENTITY(1,1) PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    role VARCHAR(50) NOT NULL,
                    dep_id INT NOT NULL FOREIGN KEY REFERENCES Department(dep_id),
                    is_active BIT DEFAULT 1
                )
                PRINT 'Staff table created.'
            END ELSE PRINT 'Staff table already exists.'
        `);

        // 4. Patient
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Patient' and xtype='U')
            BEGIN
                CREATE TABLE Patient (
                    p_id INT IDENTITY(1,1) PRIMARY KEY,
                    patient_name VARCHAR(100) NOT NULL,
                    mobile_number VARCHAR(20) NOT NULL,
                    created_at DATETIME DEFAULT GETDATE()
                )
                PRINT 'Patient table created.'
            END ELSE PRINT 'Patient table already exists.'
        `);

        // 5. Visit
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Visit' and xtype='U')
            BEGIN
                CREATE TABLE Visit (
                    visit_id INT IDENTITY(1,1) PRIMARY KEY,
                    p_id INT NOT NULL FOREIGN KEY REFERENCES Patient(p_id),
                    dep_id INT NOT NULL FOREIGN KEY REFERENCES Department(dep_id),
                    doctor_id INT NULL FOREIGN KEY REFERENCES Doctor(doctor_id),
                    visit_type VARCHAR(50) NOT NULL,
                    priority VARCHAR(50) NOT NULL,
                    status VARCHAR(50) DEFAULT 'active',
                    created_at DATETIME DEFAULT GETDATE()
                )
                PRINT 'Visit table created.'
            END ELSE PRINT 'Visit table already exists.'
        `);

        // 6. Token
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Token' and xtype='U')
            BEGIN
                CREATE TABLE Token (
                    token_id INT IDENTITY(1,1) PRIMARY KEY,
                    visit_id INT NOT NULL FOREIGN KEY REFERENCES Visit(visit_id),
                    token_number INT NOT NULL,
                    token_date DATE DEFAULT CAST(GETDATE() AS DATE),
                    queue_position INT NOT NULL,
                    status VARCHAR(50) DEFAULT 'waiting',
                    issued_at DATETIME DEFAULT GETDATE()
                )
                PRINT 'Token table created.'
            END ELSE PRINT 'Token table already exists.'
        `);

        // 7. Queue
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Queue' and xtype='U')
            BEGIN
                CREATE TABLE Queue (
                    queue_id INT IDENTITY(1,1) PRIMARY KEY,
                    dep_id INT NOT NULL FOREIGN KEY REFERENCES Department(dep_id),
                    doctor_id INT NULL FOREIGN KEY REFERENCES Doctor(doctor_id),
                    current_serving_token_id INT NULL FOREIGN KEY REFERENCES Token(token_id),
                    avg_wait_time INT DEFAULT 0
                )
                PRINT 'Queue table created.'
            END ELSE PRINT 'Queue table already exists.'
        `);

        console.log("Database schema initialization successfully completed.");

        // Insert some dummy departments so we have something to test with
        await request.query(`
            IF NOT EXISTS (SELECT 1 FROM Department)
            BEGIN
                INSERT INTO Department (name, description) VALUES
                ('General OPD', 'General out-patient department'),
                ('Orthopedics', 'Bone and joint care'),
                ('Pediatrics', 'Children care');
                PRINT 'Inserted dummy departments.'
            END
        `);

        process.exit(0);
    } catch (err) {
        console.error("Error creating tables:", err.message);
        process.exit(1);
    }
};

createTables();
