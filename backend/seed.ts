import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Product from './models/Product';
import User from './models/User';
import { sampleProducts } from './sampleData';
import connectDB from './db';

dotenv.config();

const seed = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(sampleProducts);

        // Seed admin user
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminName = process.env.ADMIN_NAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (adminEmail && adminName && adminPassword) {
            const existing = await User.findOne({ email: adminEmail });
            if (!existing) {
                const hashed = await bcrypt.hash(adminPassword, 10);
                await User.create({
                    name: adminName,
                    email: adminEmail,
                    password: hashed,
                    isAdmin: true,
                });
                console.log('Admin user seeded!');
            } else {
                console.log('Admin user already exists.');
            }
        }

        console.log('Database seeded!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seed(); 