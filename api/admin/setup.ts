import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../dbConnect';
import User from '../models/User';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@lecker.com' });
        if (existingAdmin) {
            return res.status(200).json({ success: true, message: 'Admin already exists', data: existingAdmin });
        }

        // Create Admin
        const adminUser = await User.create({
            name: 'Lecker Admin',
            handle: 'lecker_admin',
            email: 'admin@lecker.com',
            role: 'admin',
            password: 'Santa189.', // Converting to hash in production is recommended, storing plain for MVP request
            bio: 'Administrator del Sistema',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=f48c25&color=fff'
        });

        return res.status(201).json({ success: true, data: adminUser });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
