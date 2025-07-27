import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    console.log('Authorization header:', req.headers.authorization);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
            // FIX: set on req.user, not req.body
            (req as any).user = decoded.id;
            next();
        } catch (err) {
            console.error('JWT verification error:', err);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById((req as any).user);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized as admin' });
        }
    } catch (err) {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};