import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User, validateUser } from '../models/user.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // error.details[0].message is a string that contains the error message.

  let user = await User.findOne({ email: req.body.email });

  // If the user is already registered, return a 400 status code and a message.
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // Use Lodash to pick only the name and email properties from the user object.
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

export default router;