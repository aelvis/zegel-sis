import type { Request, Response } from 'express';
import { AppDataSource } from '../config/database.js';
import { Producto } from '../entities/Producto.js';

export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await AppDataSource.getRepository(Producto).find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

export const createProducto = async (req: Request, res: Response) => {
    try {
        const producto = AppDataSource.getRepository(Producto).create(req.body);
        const result = await AppDataSource.getRepository(Producto).save(producto);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

export const updateProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Producto no proporcionado.' });
    }
    try {
        const productoRepo = AppDataSource.getRepository(Producto);
        const producto = await productoRepo.findOne({ where: { id: parseInt(id) } });

        if (!producto) {
            return res.status(400).json({ message: 'Producto no encontrado.' });
        }

        productoRepo.merge(producto, req.body);
        const result = await productoRepo.save(producto);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

export const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Producto no proporcionado.' });
    }
    try {
        const result = await AppDataSource.getRepository(Producto).delete(id);
        if (result.affected === 0) {
            return res.status(400).json({ message: 'Producto no encontrado.' });
        }
        res.json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};