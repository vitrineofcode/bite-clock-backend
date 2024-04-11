// app.js
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import foodItemRoutes from './routes/foodItemRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bite-clock');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB server started on the 27017');
});

// Use the user routes
app.use('/api/users', userRoutes);

// Use the food item routes
app.use('/api', foodItemRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
