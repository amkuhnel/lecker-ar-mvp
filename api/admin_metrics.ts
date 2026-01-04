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
    venueName: { type: String },
    dishName: { type: String },
    rating: { type: Number },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
}, { strict: false });

const userSchema = new mongoose.Schema({
    name: { type: String },
    handle: { type: String },
    email: { type: String },
}, { strict: false });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await internalDbConnect();

        const { startDate, endDate } = req.query;

        // Build date filter
        const dateFilter: any = {};
        if (startDate) {
            dateFilter.$gte = new Date(startDate as string);
        }
        if (endDate) {
            dateFilter.$lte = new Date(endDate as string);
        }

        const reviewFilter: any = {};
        if (Object.keys(dateFilter).length > 0) {
            reviewFilter.createdAt = dateFilter;
        }

        // 1. Total de reseñas (solo aprobadas)
        const totalReviews = await Review.countDocuments({
            ...reviewFilter,
            status: 'approved'
        });

        // 2. Usuarios activos (usuarios con al menos 1 reseña aprobada en el periodo)
        const activeUsersResult = await Review.aggregate([
            { $match: { ...reviewFilter, status: 'approved' } },
            { $group: { _id: '$userId' } },
            { $count: 'count' }
        ]);
        const activeUsers = activeUsersResult.length > 0 ? activeUsersResult[0].count : 0;

        // 3. Restaurantes únicos reseñados
        const uniqueVenuesResult = await Review.aggregate([
            { $match: { ...reviewFilter, status: 'approved' } },
            { $group: { _id: '$venueName' } },
            { $count: 'count' }
        ]);
        const uniqueVenues = uniqueVenuesResult.length > 0 ? uniqueVenuesResult[0].count : 0;

        // 4. Reseñas pendientes de aprobación
        const pendingReviews = await Review.countDocuments({ status: 'pending' });

        res.status(200).json({
            success: true,
            data: {
                totalReviews,
                activeUsers,
                uniqueVenues,
                pendingReviews,
                period: {
                    startDate: startDate || null,
                    endDate: endDate || null
                }
            }
        });

    } catch (error: any) {
        console.error('Metrics error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
