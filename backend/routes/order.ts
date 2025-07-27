import express from 'express';
import {
    placeOrder,
    getOrders,
    getOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder,
} from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';
import { admin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/', protect, getOrders);
router.get('/all', protect, admin, getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', protect, admin, updateOrder);
router.delete('/:id', protect, admin, deleteOrder);

export default router; 