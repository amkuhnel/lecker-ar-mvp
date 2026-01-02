import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './dbConnect';
import User from './models/User';
import Review from './models/Review';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Get basic stats
        const userCount = await User.countDocuments();
        const reviewCount = await Review.countDocuments();

        // Find top user
        // Note: This is a heavy aggregation, simplified for MVP
        const users = await User.find({});
        // In real app, use aggregation pipeline

        return res.status(200).json({
            success: true,
            data: {
                totalUsers: userCount,
                totalReviews: reviewCount,
                activeUsers: users.length // Placeholder
            }
        });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
