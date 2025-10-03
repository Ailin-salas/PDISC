import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Guardamos el userId en la request para usarlo en las rutas
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export default verifyToken;
