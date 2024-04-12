import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d'});
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET); 
};

export { generateToken, verifyToken };
