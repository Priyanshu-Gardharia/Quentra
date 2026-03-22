import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Load env vars
dotenv.config();

import patientRoutes from './routes/patientRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import queueRoutes from './routes/queueRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());    

app.use('/api/patient', patientRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/queue', queueRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, async () => {
    // Connect to database before starting server successfully
    await connectDB();
    console.log("Server is running on port 5000");
});