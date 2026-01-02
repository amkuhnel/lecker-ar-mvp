import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './_shared/dbConnect';
import User from './_shared/models/User';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // 1. Check Env Var availability
    const uri = process.env.MONGODB_URI;
    const hasUri = !!uri;
    const uriStart = uri ? uri.substring(0, 15) + '...' : 'undefined';

    const debugInfo: any = {
        hasUri,
        uriPreview: uriStart,
        nodeVersion: process.version,
    };

    try {
        // 2. Connect
        await dbConnect();
        debugInfo.dbConnection = 'Success';

        // 3. Count Users
        // @ts-ignore
        const count = await User.countDocuments();
        debugInfo.userCount = count;

        return res.status(200).json({ success: true, debugInfo });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
            debugInfo // Return what we gathered so far
        });
    }
}
