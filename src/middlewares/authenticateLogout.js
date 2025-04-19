



import jwt from 'jsonwebtoken';
import { config } from 'dotenv'; 

config(); 


const { JWT_ACCESS_SECRET } = process.env;
if (!JWT_ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not defined in the .env file');
}


export const logout = (req, res, next) => {
  const token = req.cookies.access_token;  

  if (!token) {
    return res.status(400).json({ status: 'error', message: 'No active session found' });
  }


  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie('access_token');  
      res.clearCookie('refresh_token');
      return res.status(401).json({ status: 'error', message: 'Token expired or invalid, user logged out' });
    }

    req.user = decoded;  
    res.clearCookie('access_token');  
    res.clearCookie('refresh_token');
    res.status(200).json({ status: 'success', message: 'User logged out' });
  });
};
