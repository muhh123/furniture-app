
import { Request, Response } from 'express';
import Cart from '../models/Cart';
import mongoose from 'mongoose';

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        if (!userId) return res.status(400).json({ message: 'Missing userId' });
        const cart = await Cart.findOne({ user: userId });
        res.json(cart || { cartItems: [] });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// ...existing code...

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
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId, qty = 1 } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ message: 'Missing userId or productId' });
        }
        // Fetch product details
        const Product = require('../models/Product').default;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
        }
        // Check if product already exists in cart
        const existingItem = cart.cartItems.find((item: any) => item.product.toString() === productId);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.cartItems.push({
                product: product._id,
                name: product.name,
                qty,
                price: product.price,
                image: product.image || ''
            });
        }
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