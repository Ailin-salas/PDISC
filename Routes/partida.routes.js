import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware para manejar excepciones en promesas asincrónicas
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /partidas
// Obtener todas las partidas, con filtro opcional por torneoId
router.get('/', asyncHandler(async (req, res) => {
  const { torneoId } = req.query;

  const partidas = await prisma.partida.findMany({
    where: {
      torneoId: torneoId ? parseInt(torneoId) : undefined,
    },
  });
  res.json(partidas);
}));

// GET /partidas/:id
// Obtener una partida por ID
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const partida = await prisma.partida.findUnique({
    where: {
      id_partida: parseInt(id),
    },
  });

  if (partida) {
    res.json(partida);
  } else {
    res.status(404).json({ error: 'Partida no encontrada.' });
  }
}));

// POST /partidas
// Crear una nueva partida
router.post('/', asyncHandler(async (req, res) => {
  const { resultado, fecha_partida, torneoId } = req.body;

  if (!torneoId) {
    return res.status(400).json({ error: 'El ID del torneo es obligatorio.' });
  }

  const nuevaPartida = await prisma.partida.create({
    data: {
      resultado,
      fecha_partida: new Date(fecha_partida),
      torneo: {
        connect: {
          id_torneo: torneoId,
        },
      },
    },
  });

  res.status(201).json(nuevaPartida);
}));

// PUT /partidas/:id
// Actualizar una partida
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { resultado, fecha_partida, torneoId } = req.body;

  try {
    const partidaActualizada = await prisma.partida.update({
      where: {
        id_partida: parseInt(id),
      },
      data: {
        resultado,
        fecha_partida: fecha_partida ? new Date(fecha_partida) : undefined,
        torneo: torneoId ? { connect: { id_torneo: torneoId } } : undefined,
      },
    });

    res.json(partidaActualizada);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Partida no encontrada para actualizar.' });
    }
    throw error;
  }
}));

// DELETE /partidas/:id
// Eliminar una partida
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.partida.delete({
      where: {
        id_partida: parseInt(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Partida no encontrada para eliminar.' });
    }
    throw error;
  }
}));

export default router;