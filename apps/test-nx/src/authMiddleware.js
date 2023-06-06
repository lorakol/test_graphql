const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.TOKEN_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized request1' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized request' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;