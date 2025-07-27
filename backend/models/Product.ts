import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
    countInStock?: number;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
    countInStock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', productSchema); 