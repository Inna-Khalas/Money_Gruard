import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


config(); 


const { JWT_ACCESS_SECRET } = process.env;
if (!JWT_ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not defined in the .env file');
}


export const verifyToken = (req, res, next) => {
  // токен из заголовка Authorization
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  //  пытаемся достать токен из куков
  if (!token && req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  // Если токена вообще нет — не бросаем ошибку, просто идем дальше
  if (!token) {
    console.warn('No token found, but proceeding to allow logout.');
    return next();
  }

  //  верифицировать токен
  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      //  Если токен невалидный — просто чистим куки и позволяем выйти без ошибки
      console.warn('Token expired or invalid. Cleaning cookies and proceeding.');
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return next(); //  Не кидаем ошибку — идем дальше!
    }

    //  токен валидный — сохраняем данные пользователя
    req.user = decoded;
    next();
  });
};
