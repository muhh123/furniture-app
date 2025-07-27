import { Request, Response } from 'express';
import Order from '../models/Order';

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        // FIX: use req.user
        const userId = (req as any).user;
        const orders = await Order.find({ user: userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
}; 