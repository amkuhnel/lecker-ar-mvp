
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// --- INLINED DB CONNECTION & MODEL TO AVOID RESOLUTION ERRORS ---
const MONGODB_URI = process.env.MONGODB_URI;

async function internalDbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
    return mongoose.connect(MONGODB_URI, { bufferCommands: false });
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    stats: {
        reviews: { type: Number, default: 0 },
        followers: { type: Number, default: 0 },
        following: { type: Number, default: 0 },
    },
    joinedDate: { type: Date, default: Date.now },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: false, select: false },
});

// Reuse existing model if defined, otherwise compile it
const User = mongoose.models.User || mongoose.model('User', userSchema);
// -------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Allow GET for easy browser execution, and POST for API consistency
        if (req.method !== 'POST' && req.method !== 'GET') {
            return res.status(405).json({ success: false, message: 'Method not allowed' });
        }

        console.log('Admin setup handler started (Standalone Mode). Connecting...');
        await internalDbConnect();
        console.log('DB Connected via Inline Logic.');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@lecker.com' });
        if (existingAdmin) {
            console.log('Admin user already found.');
            return res.status(200).json({ success: true, message: 'Admin already exists', data: existingAdmin });
        }

        console.log('Creating new Admin user...');
        // Create Admin
        const adminUser = await User.create({
            name: 'Lecker Admin',
            handle: 'lecker_admin',
            email: 'admin@lecker.com',
            role: 'admin',
            password: 'Santa189.',
            bio: 'Administrator del Sistema',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=f48c25&color=fff'
        });
        console.log('Admin user created successfully.');

        return res.status(201).json({ success: true, data: adminUser });

    } catch (error: any) {
        console.error('Setup error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
