import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import notFound from './middlewares/error.js';
import logger from './middlewares/logger.js';                                                                                                         
import partidaRoutes from './Routes/partida.routes.js'; 
import torneoRoutes from './Routes/torneo.routes.js';
import usuarioRoutes from './Routes/usuario.routes.js';
import authRoutes from './Routes/auth.routes.js';  
// import testRoutes from './Routes/test.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json()); // para leer JSON
app.use(cors()); 
app.use(logger); // Aplica el middleware a todas las rutas

// Servir archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Ruta raiz (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/usuarios/sesion/Registro.html'));
});

// Ruta de prueba
// app.get('/api/ping', (req, res) => {
  // res.send('Pong 🏓');
// });

// app.get('/', (req, res) => {
//   res.sendFile('./public/index.html', { root: '.' }); 
// });

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/partidas', partidaRoutes);
app.use('/api/torneo', torneoRoutes);
app.use('/api/usuario', usuarioRoutes);
//  app.use('/test', testRoutes); // Ruta de prueba

// Manejo de errores 
app.use(notFound); 

// Exportar la app para Vercel (sin app.listen)
export default app;
