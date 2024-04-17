import auth from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User } from '../models/user.js';
import express from 'express';
import signIn from '../controllers/user.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken(); // Use the generateAuthToken method from the User schema
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/signin', signIn, auth);

export default router;
