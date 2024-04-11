// app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import foodItemRoutes from './routes/foodItemRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bite-clock');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB server started successfully');
});

// Use the user routes
app.use('/api/users', userRoutes);

// Use the food item routes
app.use('/api', foodItemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
