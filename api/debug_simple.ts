
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const uri = process.env.MONGODB_URI;

    // 1. Basic Info
    const info = {
        nodeEnv: process.env.NODE_ENV,
        hasMongoose: !!mongoose,
        mongoUriConfigured: !!uri,
        nodeVersion: process.version
    };

    try {
        if (!uri) throw new Error("Mongo URI missing in ENV");

        // 2. Direct Connection (No helper)
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri, { bufferCommands: false });
        }

        // 3. Simple Operation
        const connectionState = mongoose.connection.readyState; // 1 = connected

        return res.status(200).json({
            success: true,
            message: "Standalone connection successful",
            connectionState,
            info
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
            info
        });
    }
}
