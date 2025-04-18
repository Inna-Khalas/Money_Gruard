





require('dotenv').config(); 
const jwt = require('jsonwebtoken');


const { JWT_ACCESS_SECRET } = process.env;
if (!JWT_ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not defined in the .env file');
}

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;


  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }


  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie('access_token');  
      res.clearCookie('refresh_token');
      return res.status(401).json({ status: 'error', message: 'Token expired or invalid, user logged out' });
    }

    req.user = decoded;  
    next(); 
  });
};
