import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from "express";
import prisma from "../lib/prisma.js";
import EnviarMensaje from '../services/emails.js';
import { nanoid } from 'nanoid';

const router = Router();   

//POST /auth/guest-login - login de invitado
router.post('/guest-login', async (req, res) => {
  try {
    const { nombre } = req.body;

    ///crea un nombre generico si no se proporciona 
    const guestName = nombre || `Invitado-${nanoid(8)}`; //genera un id unico de 8 caracteres
    
    //crea el usuario invitado en la base de datos
    const guestUser = await prisma.usuario.create({
      data: {
        nombre: guestName,
        isGuest: true, //marca como invitado
        }
    });

    //genera un token JWT para el usuario invitado
    const token = jwt.sign(
      {id_usuario: guestUser.id_usuario, isGuest: true},
      process.env.JWT_SECRET,
      { expiresIn: '1h' } //el token es valido por una hora
    );

    return res.status(201).json({
      message: 'Acceso de invitado exitoso',
      token: token,
      nombre: guestUser.nombre 
    });

  } catch (error) {
    console.error('Error en /guest-login:', error);
    return res.status(500).json({ error: 'Error al registrarse como invitado' });
  }
});


//POST /auth/register - registro de usuario 
router.post('/register', async (req, res) => {
  const { email, password, nombre } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // El 10 es el número de rondas de salt

  // Validar si el email ya está en uso
  const isEmailTaken = await prisma.usuario.findUnique({
    where: { email },
  });

  if (isEmailTaken) {
    return res.status(400).json({ error: 'Email ya utilizado' });
  }

  const newUser = await prisma.usuario.create({
    data: {
      email,
      password: hashedPassword,
      nombre, 
    },
  });
  await EnviarMensaje(email, nombre); //envia el email de bienvenida

  return res.status(201).json({ message: 'Usuario creado', userId: newUser.id_usuario });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //busca al usuario por su email
    const user = await prisma.usuario.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(401).json({ error: 'Credenciales Inválidas :(' });
    }

    if (user.isGuest) {
      return res.status(401).json({ error: 'Los usuarios invitados no pueden iniciar sesión. Por favor, regístrese.' });
    }

    //verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    //genera un Token JWT
    const token = jwt.sign({ userId: user.id_usuario, email: user.email },
        process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'login exitoso', token });
});

export default router;