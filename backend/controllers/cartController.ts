import { Request, Response } from 'express';
import Cart from '../models/Cart';

export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ user: req.body.userId });
        res.json(cart || { cartItems: [] });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { userId, product, name, qty, price, image } = req.body;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
        }
        cart.cartItems.push({ product, name, qty, price, image });
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        cart.cartItems = cart.cartItems.filter((item: any) => item.product.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export const clearCart = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        cart.cartItems = [];
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
}; 