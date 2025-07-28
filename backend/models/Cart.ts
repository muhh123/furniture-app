mport mongoose, { Document, Schema, Types } from 'mongoose';i

export interface ICartItem {
    product: Types.ObjectId;
    name: string;
    qty: number;
    price: number;
    image: string;
}

export interface ICart extends Document {
    user: Types.ObjectId;
    cartItems: ICartItem[];
}

const cartSchema = new Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            name: String,
            qty: Number,
            price: Number,
            image: String,
        }
    ],
}, { timestamps: true });

export default mongoose.model<ICart>('Cart', cartSchema); 