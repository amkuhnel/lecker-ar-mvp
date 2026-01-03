import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// --- INLINED DB CONNECTION & MODEL ---
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Only allow POST for safety
        if (req.method !== 'POST') {
            return res.status(405).json({ success: false, message: 'Method not allowed' });
        }

        console.log('Cleanup users handler started. Connecting to DB...');
        await internalDbConnect();
        console.log('DB Connected.');

        // Delete all users EXCEPT the admin
        const result = await User.deleteMany({
            email: { $ne: 'admin@lecker.com' }
        });

        console.log(`Deleted ${result.deletedCount} non-admin users.`);

        // Verify admin still exists
        const adminUser = await User.findOne({ email: 'admin@lecker.com' });

        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: 'Warning: Admin user not found after cleanup!'
            });
        }

        return res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} users. Admin user preserved.`,
            deletedCount: result.deletedCount,
            adminExists: true
        });

    } catch (error: any) {
        console.error('Cleanup error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
