import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './dbConnect';
import Review from './models/Review';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                // Filter by userId if provided
                const filter = req.query.userId ? { userId: req.query.userId } : {};

                // Populate user details for each review
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

        default:
            res.status(400).json({ success: false });
            break;
    }
}
