import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './dbConnect';
import User from './models/User';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Allow GET for easy browser execution, and POST for API consistency
        if (req.method !== 'POST' && req.method !== 'GET') {
            return res.status(405).json({ success: false, message: 'Method not allowed' });
        }

        console.log('Admin setup handler started. Connecting to DB...');
        await dbConnect();
        console.log('DB Connected.');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@lecker.com' });
        if (existingAdmin) {
            console.log('Admin user already found.');
            return res.status(200).json({ success: true, message: 'Admin already exists', data: existingAdmin });
        }

        console.log('Creating new Admin user...');
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
        console.log('Admin user created successfully.');

        return res.status(201).json({ success: true, data: adminUser });

    } catch (error: any) {
        console.error('Setup error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
