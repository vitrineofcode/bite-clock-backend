import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));


app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
