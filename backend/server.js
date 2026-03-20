import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());    

app.use('/api/patients', patientRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
}); 