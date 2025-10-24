import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from "express";
import { z } from "zod"; // Importamos Zod
import { nanoid } from 'nanoid';
import EnviarMensaje from '../services/emails.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

// Esquema para la validación del Registro
const registerSchema = z.object({
  nombre: z.string().trim().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "El email no es válido." }).min(1, { message: "El email es obligatorio." }).toLowerCase(),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

// Esquema para la validación del Login
const loginSchema = z.object({
  email: z.string().email({ message: "El email no es válido." }).min(1, { message: "El email es obligatorio." }).toLowerCase(),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

// POST /auth/guest-login - login de invitado
router.post('/guest-login', async (req, res) => {
    try {
        // Manejo seguro del body vacío y desestructuración
        const body = req.body || {};
        const { nombre } = body;

        // Genera el nombre aleatorio si 'nombre' es nulo o una cadena vacía/espacios.
        const guestName = (nombre && nombre.trim().length > 0) 
            ? nombre.trim() 
            : `Invitado-${nanoid(8)}`; 

        // Crea el usuario invitado en la base de datos
        const guestUser = await prisma.usuario.create({
            data: {
                nombre: guestName,
                isGuest: true, // marca como invitado
            }
        });

        // Genera un token JWT para el usuario invitado
        const token = jwt.sign(
            {id_usuario: guestUser.id_usuario, isGuest: true},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
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

// POST /auth/register - registro de usuario
router.post('/register', async (req, res) => {
    try {
        // Valida y sanitiza los datos con Zod. El método .parse() lanza un error si falla.
        const userData = registerSchema.parse(req.body);

        const { email, password, nombre } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

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
        await EnviarMensaje(email, nombre); // envia el email de bienvenida

        return res.status(201).json({ message: 'Usuario creado', userId: newUser.id_usuario });

    } catch (error) {
        // Captura los errores de validación de Zod
        if (error instanceof z.ZodError) {
            // Retorna un objeto de errores claro para el frontend
            return res.status(400).json({ 
                error: "Datos de formulario inválidos",
                details: error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        console.error('Error en /register:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// POST /auth/login - inicio de sesión
router.post('/login', async (req, res) => {
    try {
        // Valida los datos del login con Zod
        const userData = loginSchema.parse(req.body);
        const { email, password } = userData;

        // Busca al usuario por su email
        const user = await prisma.usuario.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        if (user.isGuest) {
            return res.status(401).json({ error: 'Los usuarios invitados no pueden iniciar sesión con contraseña.' });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Genera un Token JWT
        const token = jwt.sign({ userId: user.id_usuario, email: user.email },
            process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'login exitoso', token });
        
    } catch (error) {
        // Captura los errores de validación de Zod
        if (error instanceof z.ZodError) {
             return res.status(400).json({ 
                error: "Datos de formulario inválidos",
                details: error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        console.error('Error en /login:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

export default router;