import mongoose from 'mongoose';
import genresRouter from './routes/genres.js';
import customersRouter from './routes/customers.js';
import gamesRouter from './routes/games.js';
import usersRouter from './routes/users.js';
import auth from './routes/auth.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', auth);

if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
