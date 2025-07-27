import { Request, Response } from 'express';
import Product from '../models/Product';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}; 