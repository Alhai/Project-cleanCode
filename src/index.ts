import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in the .env file');
    process.exit(1);
}

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Blog Application');
});

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });