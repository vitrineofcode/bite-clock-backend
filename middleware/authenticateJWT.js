import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { secretKey } from '../config.js';

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token.' });
      }

      try {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return res.status(403).json({ message: 'User not found.' });
        }

        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};

export default authenticateJWT;
