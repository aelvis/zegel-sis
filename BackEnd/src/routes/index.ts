import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { login, register } from '../controllers/auth.controller.js';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../controllers/productos.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.use(authenticateToken);
router.get('/productos', getProductos);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

export default router;