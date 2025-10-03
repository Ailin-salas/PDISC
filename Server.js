import express from 'express';
import cors from 'cors';
import notFound from './middlewares/error.js';
import logger from './middlewares/logger.js'; 
// import partidaRoutes from './Routes/partida.routes.js'; 
// import torneoRoutes from './Routes/torneo.routes.js';
// import usuarioRoutes from './Routes/usuario.routes.js';
// import authRoutes from './Routes/auth.routes.js';  
import testRoutes from './Routes/test.router.js';

const app = express();

// Middleware
app.use(express.json()); // para leer JSON
app.use(cors()); 

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));  

// Middleware de logging
app.use(logger); // Aplica el middleware a todas las rutas

// Ruta para servir la página de inicio
app.get('/', (req, res) => {
  res.sendFile('pages/usuario/inicio/index.html', { root: 'public' });
});

// Rutas de autenticación
// app.use('/auth', authRoutes);

// Rutas de la API
// app.use('/partidas', partidaRoutes);
// app.use('/torneo', torneoRoutes);
// app.use('/usuario', usuarioRoutes);
app.use('/test', testRoutes); // Ruta de prueba

// Manejo de errores 404
app.use(notFound); 

// Exportar la app para Vercel (sin app.listen)
export default app;
