import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db';
import User from './models/User';

const run = async () => {
    await connectDB();
    const result = await User.deleteOne({ email: process.env.ADMIN_EMAIL });
    if (result.deletedCount) {
        console.log('Admin user deleted.');
    } else {
        console.log('Admin user not found.');
    }
    process.exit();
};

run();
