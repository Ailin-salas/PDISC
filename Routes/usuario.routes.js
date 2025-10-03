import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import EnviarMensaje from '../services/emails.js';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware para manejar excepciones en promesas asincrónicas
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /usuario
router.get('/', asyncHandler(async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
}));

// GET /usuario/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: parseInt(id) },
  });
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado.' });
  }
}));

// POST /usuario
router.post('/', asyncHandler(async (req, res) => {
  const { email, nombre, password, ELO } = req.body;
  if (!email || !nombre || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: email, nombre y contraseña.' });
  }

  try {
          const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
          const nuevoUsuario = await prisma.usuario.create({
            data: {
            email,
            nombre,
            password: hashedPassword, 
            ELO,
          },
      });
  // Enviar email de bienvenida
  await EnviarMensaje(nuevoUsuario.email, nuevoUsuario.nombre);
  //respuesta de exito al cliente
  res.status(201).json(nuevoUsuario);
}catch (error) {
  console.error('Error al crear usuario:', error);
  res.status(400).json({ error: 'Error del servidor al crear usuario.' });
}
}));

// PUT /usuario/:id
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, nombre, password, ELO } = req.body;
  const usuarioActualizado = await prisma.usuario.update({
    where: { id_usuario: parseInt(id) },
    data: {
      email,
      nombre,
      password: password,
      ELO,
    },
  });
  res.json(usuarioActualizado);
}));

// DELETE /usuario/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.usuario.delete({
    where: { id_usuario: parseInt(id) },
  });
  res.status(204).send();
}));

export default router;