import Game from '../models/game.js';
import  Genre from '../models/genre.js';
import express from 'express';

const router = express.Router();

// GET all games
router.get('/', async (req, res) => {
  const games = await Game.find().sort('name');
  res.send(games);
});

// POST a new game
router.post('/new', async (req, res) => {
  const { title, genreName, numberInStock, dailyRentalRate } = req.body;
  try {
      // Check if the genre already exists
      let genre = await Genre.findOne({ name: genreName });
      if (!genre) {
          // If the genre does not exist, create a new one
          genre = new Genre({ name: genreName });
          await genre.save();
      }
      // Create a new game with the genre's ID
      const game = new Game({
          title,
          genre: genre._id,
          numberInStock,
          dailyRentalRate
      });
      await game.save();
      res.send(game);
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the game.");
  }
});

// PUT update a game by name
router.put('/update/:gameName', async (req, res) => {
  const gameName = req.params.gameName;
  const { newTitle } = req.body;

  console.log(`Received new title: ${newTitle}`);  // Check what's received

  if (!newTitle) {
    return res.status(400).send('New title is required.');
  }

  try {
    const game = await Game.findOneAndUpdate({ title: gameName }, {
      title: newTitle
    }, { new: true });

    if (!game) {
      return res.status(404).send('The game with the given name was not found.');
    }

    console.log('Updated game:', game);
    res.send(game);
  } catch (error) {
    console.error("Error while updating the game:", error);
    res.status(500).send("An error occurred while updating the game: " + error.message);
  }
});

// DELETE a game by title
router.delete('/title/:gameTitle', async (req, res) => {
  const gameTitle = req.params.gameTitle;
  console.log(`Attempting to delete game with title: ${gameTitle}`);  // Log the attempt
  try {
    const game = await Game.findOneAndDelete({ title: gameTitle });
    console.log(`Find result: ${game}`);  // Log the find result
    if (!game) {
      return res.status(404).send('The game with the given title was not found.');
    }
    res.send(game);
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).send('Server error');
  }
});


// GET a game by ID
router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (!game) return res.status(404).send('The game with the given ID was not found.');

  res.send(game);
});

export default router;
