// routes/userRoutes.js
import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to logout a user
router.post('/logout', passport.authenticate('jwt', { session: false }), logoutUser);

export default router;
