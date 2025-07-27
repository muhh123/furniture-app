import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrderItem {
    product: Types.ObjectId;
    name: string;
    qty: number;
    price: number;
    image: string;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}

const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            name: String,
            qty: Number,
            price: Number,
            image: String,
        }
    ],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: { type: String },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', orderSchema); 