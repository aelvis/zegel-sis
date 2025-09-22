import type { Request, Response } from 'express';
import { AppDataSource } from '../config/database.js';
import { Usuario } from '../entities/Usuario.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "super_secreto_y_largo";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const usuarioRepo = AppDataSource.getRepository(Usuario);
        const nuevoUsuario = usuarioRepo.create({ email, password });
        await nuevoUsuario.hashPassword();
        const result = await usuarioRepo.save(nuevoUsuario);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const usuario = await AppDataSource.getRepository(Usuario).findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado.");
        }

        const isPasswordValid = await usuario.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).send("Contraseña incorrecta.");
        }

        const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};