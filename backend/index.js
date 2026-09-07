import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import mediaRoutes from './routes/mediaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.join({status : 'ok', message : 'Server Running'});
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.log('Error : MONGO_URI is not defined in environment variables.');
    process.exit(1);
}

// Media API
app.use('/api/media', mediaRoutes);

app.get('/api/health', (req, res) => {
    res.join({status: 'ok', message: 'Server Running'});
});

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB :', error));

app.listen(PORT, () => console.log('Server active on port ${PORT}'));