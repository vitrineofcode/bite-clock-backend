import { Rental, validateRental } from '../models/rental.js';
import { Game } from '../models/game.js'; 
import { Customer } from '../models/customer.js';
import express from 'express';

const router = express.Router();

// GET all rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

// POST a new rental
router.post('/', async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(`Validation error: ${error.details[0].message}`);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Customer not found.');

  const game = await Game.findById(req.body.gameId);
  if (!game) return res.status(400).send('Game not found.');

  if (game.numberInStock === 0) return res.status(400).send('Game is out of stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    game: {
      _id: game._id,
      title: game.title,
      dailyRentalRate: game.dailyRentalRate
    }
  });
  rental = await rental.save();

  game.numberInStock--;
  game.save();

  res.send(rental);
});

// GET a rental by ID
router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('Rental not found.');

  res.send(rental);
});

export default router;
