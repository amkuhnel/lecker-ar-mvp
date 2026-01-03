
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

// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=400&auto=format&fit=crop' },
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
// -------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;

    await internalDbConnect();

    switch (method) {
        case 'GET':
            try {
                if (req.query.id) {
                    const user = await User.findById(req.query.id);
                    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                    return res.status(200).json({ success: true, data: user });
                }
                const users = await User.find({});
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                const user = await User.create(req.body);
                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'PUT':
            try {
                // Used for Password Reset or Update Profile
                const { id } = req.query;
                if (!id) return res.status(400).json({ success: false, error: 'User ID required' });

                const updateData = { ...req.body };
                const user = await User.findByIdAndUpdate(id, updateData, { new: true });

                if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) return res.status(400).json({ success: false, error: 'User ID required' });

                const deletedUser = await User.findByIdAndDelete(id);
                if (!deletedUser) return res.status(404).json({ success: false, error: 'User not found' });

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
