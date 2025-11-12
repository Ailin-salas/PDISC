import express from 'express';
import { PrismaClient } from '@prisma/client';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

const prisma = new PrismaClient();

// Middleware para manejar excepciones en promesas asincrónicas
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /torneo
router.get('/', asyncHandler(async (req, res) => {
  const torneos = await prisma.torneo.findMany();
  res.json(torneos);
}));

// GET /torneo/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const torneo = await prisma.torneo.findUnique({
    where: { id_torneo: parseInt(id) },
  });
  if (torneo) {
    res.json(torneo);
  } else {
    res.status(404).json({ error: 'Torneo no encontrado.' });
  }
}));

// POST /torneo
router.post('/', asyncHandler(async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const { nombre, fecha_inicio, reglas, premios, tipo_torneo, creadorId } = req.body;
    const nuevoTorneo = await prisma.torneo.create({
      data: {
        nombre,
        fecha_inicio: new Date(fecha_inicio),
        reglas,
        premios,
        tipo_torneo,
        creador: { connect: { id_usuario: creadorId } }
      }
    });
    res.status(201).json(nuevoTorneo);
  } catch (error) {
    console.error("Error al crear torneo:", error);
    res.status(500).json({ error: "No se pudo crear el torneo" });
  }
}));


// PUT /torneo/:id
router.put('/:id', verifyToken, asyncHandler(async (req, res) => { //Solo los usuarios autenticados pueden actualizar torneos
  const { id } = req.params;
  const { nombre, fecha_inicio, reglas, premios, tipo_torneo, creadorId } = req.body;
  const torneoActualizado = await prisma.torneo.update({
    where: { id_torneo: parseInt(id) },
    data: {
      nombre,
      fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : undefined,
      reglas,
      premios,
      tipo_torneo,
      creadorId,
    },
  });
  res.json(torneoActualizado);
}));

// DELETE /torneo/:id
router.delete('/:id',verifyToken, asyncHandler(async (req, res) => { //Solo los usuarios autenticados pueden eliminar torneos 
  const { id } = req.params;
  await prisma.torneo.delete({
    where: { id_torneo: parseInt(id) },
  });
  res.status(204).send();
}));

export default router;