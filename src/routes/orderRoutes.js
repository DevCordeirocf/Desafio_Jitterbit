import express from 'express';
import {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas as rotas de pedidos é necessário autenticação JWT
router.use(authenticateToken);

router.post('/', createOrder);
router.get('/list', listOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
