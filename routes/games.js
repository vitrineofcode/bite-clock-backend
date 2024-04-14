import { Game, validateGame } from '../models/game.js';
import { Genre } from '../models/genre.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.find().sort('name');
  res.send(games);
});

router.post('/', async (req, res) => {
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let game = new Game({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  game = await game.save();

  res.send(game);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const game = await Game.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!game) return res.status(404).send('The game with the given ID was not found.');

  res.send(game);
});

router.delete('/:id', async (req, res) => {
  const game = await Game.findByIdAndRemove(req.params.id);

  if (!game) return res.status(404).send('The game with the given ID was not found.');

  res.send(game);
});

router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (!game) return res.status(404).send('The game with the given ID was not found.');

  res.send(game);
});

export default router;
