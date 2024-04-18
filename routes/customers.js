import Customer from '../models/customer.js';
import express from 'express';

const router = express.Router();

// GET all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// POST a new customer
router.post('/new', async (req, res) => {
  const { error } = Customer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

// PUT update a customer
router.put('/update/:name', async (req, res) => {
  const customerName = req.params.name;
  const { name, phone } = req.body;

  try {
      // Find customer by name and update
      const customer = await Customer.findOneAndUpdate({ name: customerName }, {
          name,
          phone
      }, { new: true, useFindAndModify: false });

      if (!customer) {
          return res.status(404).send('Customer not found.');
      }

      res.send(customer);
  } catch (error) {
      console.error('Error updating the customer:', error);
      res.status(500).send(error.message);
  }
});


// DELETE a customer
router.delete('/name/:name', async (req, res) => {
  const customerName = req.params.name;
  try {
      const customer = await Customer.findOneAndDelete({ name: customerName });

      if (!customer) {
          return res.status(404).send('Customer not found.');
      }

      res.send(customer);
  } catch (error) {
      console.error('Error deleting the customer:', error);
      res.status(500).send('Internal Server Error');
  }
});


// GET a customer by ID
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('Customer not found.');

  res.send(customer);
});

export default router;
