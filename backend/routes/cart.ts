import express from 'express';
import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
} from '../controllers/cartController';

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);

export default router; 