
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// --- INLINED LOGIC -------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI;

async function internalDbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
    return mongoose.connect(MONGODB_URI, { bufferCommands: false });
}

// Schemas (simplified for stats)
const userSchema = new mongoose.Schema({}, { strict: false });
const reviewSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
// -------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await internalDbConnect();

        // Get basic stats
        const userCount = await User.countDocuments();
        const reviewCount = await Review.countDocuments();

        // Find top user
        const users = await User.find({});

        return res.status(200).json({
            success: true,
            data: {
                totalUsers: userCount,
                totalReviews: reviewCount,
                activeUsers: users.length
            }
        });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
