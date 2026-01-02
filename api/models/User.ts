import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=400&h=400&auto=format&fit=crop',
    },
    bio: {
        type: String,
        default: '',
    },
    stats: {
        reviews: { type: Number, default: 0 },
        followers: { type: Number, default: 0 },
        following: { type: Number, default: 0 },
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: false, // Optional for now as social login might not have it
        select: false,   // Don't result by default
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
