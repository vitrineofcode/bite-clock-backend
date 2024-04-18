import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = User(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Generate a JSON Web Token
  const token = jwt.sign({ _id: user._id }, JWT_PRIVATE_KEY);
  res.send(token);
});

export default router;
