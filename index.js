
import mongoose from 'mongoose';
import genresRouter from './routes/genres.js';
import customersRouter from './routes/customers.js';
import gamesRouter from './routes/games.js';
import rentalsRouter from './routes/rentals.js';
import express from 'express';

const app = express();


mongoose.connect('mongodb://localhost:27017/lackluster')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/rentals', rentalsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
