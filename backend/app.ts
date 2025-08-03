import express, { Application, Request, Response } from 'express';
import connectDB from './db';
import productRouter from './routes/product';
import cartRouter from './routes/cart';
import orderRouter from './routes/order';
import authRouter from './routes/auth';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';

const app: Application = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

export default app; 