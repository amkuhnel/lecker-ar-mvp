import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// --- INLINED LOGIC ---
const MONGODB_URI = process.env.MONGODB_URI;

async function internalDbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
    return mongoose.connect(MONGODB_URI, { bufferCommands: false });
}

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String },
}, { strict: false });

const userSchema = new mongoose.Schema({
    name: { type: String },
    handle: { type: String },
    email: { type: String },
    avatar: { type: String },
    stats: {
        reviews: { type: Number, default: 0 },
        followers: { type: Number, default: 0 },
        following: { type: Number, default: 0 },
    },
}, { strict: false });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await internalDbConnect();

        // Get all users
        const users = await User.find({}).lean();

        // For each user, get their review count and last review date
        const userActivity = await Promise.all(users.map(async (user) => {
            const reviewCount = await Review.countDocuments({
                userId: user._id,
                status: 'approved'
            });

            const lastReview = await Review.findOne({
                userId: user._id,
                status: 'approved'
            }).sort({ createdAt: -1 });

            let daysSinceLastReview = null;
            if (lastReview) {
                const now = new Date();
                const lastReviewDate = new Date(lastReview.createdAt);
                const diffTime = Math.abs(now.getTime() - lastReviewDate.getTime());
                daysSinceLastReview = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }

            return {
                _id: user._id,
                name: user.name,
                handle: user.handle,
                avatar: user.avatar,
                email: user.email,
                reviewCount,
                followers: user.stats?.followers || 0,
                following: user.stats?.following || 0,
                daysSinceLastReview,
                lastReviewDate: lastReview?.createdAt || null
            };
        }));

        // Sort by review count (descending)
        userActivity.sort((a, b) => b.reviewCount - a.reviewCount);

        res.status(200).json({
            success: true,
            data: userActivity
        });

    } catch (error: any) {
        console.error('Activity error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
