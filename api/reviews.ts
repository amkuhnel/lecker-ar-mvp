
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

// REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    venueId: { type: String, required: false },
    venueName: { type: String, required: true },
    dishName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    imageUrl: { type: String, required: true },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

// Need to ensure User model is compiled for populate to work
const userSchema = new mongoose.Schema({
    name: { type: String },
    handle: { type: String },
    email: { type: String },
    avatar: { type: String },
    role: { type: String },
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
// -------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;

    await internalDbConnect();

    switch (method) {
        case 'GET':
            try {
                const filter: any = {};

                // Filter by userId if provided
                if (req.query.userId) {
                    filter.userId = req.query.userId;
                }

                // Filter by status if provided (for admin), otherwise only show approved
                if (req.query.status) {
                    filter.status = req.query.status;
                } else {
                    filter.status = 'approved';
                }

                const reviews = await Review.find(filter).populate('userId', 'name handle avatar').sort({ createdAt: -1 });
                res.status(200).json({ success: true, data: reviews });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                const review = await Review.create(req.body);
                res.status(201).json({ success: true, data: review });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'PUT':
            try {
                const { id } = req.query;
                const { status, approvedBy } = req.body;

                if (!id) return res.status(400).json({ success: false, error: 'Review ID required' });
                if (!status || !['approved', 'rejected'].includes(status)) {
                    return res.status(400).json({ success: false, error: 'Valid status required (approved/rejected)' });
                }

                const updateData: any = {
                    status,
                    approvedAt: new Date()
                };

                if (approvedBy) {
                    updateData.approvedBy = approvedBy;
                }

                const updatedReview = await Review.findByIdAndUpdate(
                    id,
                    updateData,
                    { new: true }
                );

                if (!updatedReview) return res.status(404).json({ success: false, error: 'Review not found' });

                res.status(200).json({ success: true, data: updatedReview });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) return res.status(400).json({ success: false, error: 'Review ID required' });

                const deletedReview = await Review.findByIdAndDelete(id);
                if (!deletedReview) return res.status(404).json({ success: false, error: 'Review not found' });

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(405).json({ success: false, message: 'Method not allowed' });
            break;
    }
}
