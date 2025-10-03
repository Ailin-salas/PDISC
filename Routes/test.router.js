import { Router } from "express";

const router = Router();   

router.get('/test', async (req, res) => {
  try {
    const { nombre } = req.body;
    return res.send(`Hola ${nombre}, la ruta de prueba funciona correctamente.`);
  } catch (error) {
    console.error('Error en /guest-login:', error);
    return res.status(500).json({ error: 'Error al registrarse como invitado' });
  }
});


export default router;