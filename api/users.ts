import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './dbConnect';
import User from './models/User';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                // If a specific ID is provided via query
                if (req.query.id) {
                    const user = await User.findById(req.query.id);
                    if (!user) {
                        return res.status(404).json({ success: false, error: 'User not found' });
                    }
                    return res.status(200).json({ success: true, data: user });
                }

                // Otherwise return all users (for lists)
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

        default:
            res.status(400).json({ success: false });
            break;
    }
}
