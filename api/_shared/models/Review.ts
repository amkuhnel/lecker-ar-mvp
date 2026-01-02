import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    venueId: {
        type: String,
        required: false, // Optional for now as legacy data might not have it
    },
    venueName: {
        type: String,
        required: true,
    },
    dishName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    location: {
        address: String,
        lat: Number,
        lng: Number,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
