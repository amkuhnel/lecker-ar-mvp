// Direct MongoDB cleanup script (ES Module)
// Run with: node cleanup_db_direct.mjs

import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://amkuhnel:Santa189.@leckercluster.ky5dfse.mongodb.net/lecker_db?appName=LeckerCluster';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
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

const User = mongoose.model('User', userSchema);

async function cleanupDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, { bufferCommands: false });
        console.log('✅ Connected to MongoDB');

        // Count users before cleanup
        const totalBefore = await User.countDocuments();
        console.log(`\nTotal users before cleanup: ${totalBefore}`);

        // List all users before cleanup
        const usersBefore = await User.find({}, 'email handle role');
        console.log('\nUsers before cleanup:');
        usersBefore.forEach(u => console.log(`  - ${u.email} (@${u.handle}) [${u.role}]`));

        // Delete all users EXCEPT admin@lecker.com
        console.log('\n🗑️  Deleting non-admin users...');
        const result = await User.deleteMany({
            email: { $ne: 'admin@lecker.com' }
        });
        console.log(`✅ Deleted ${result.deletedCount} users`);

        // Verify admin still exists
        const adminUser = await User.findOne({ email: 'admin@lecker.com' });
        if (adminUser) {
            console.log('\n✅ Admin user preserved:');
            console.log(`   Email: ${adminUser.email}`);
            console.log(`   Handle: @${adminUser.handle}`);
            console.log(`   Role: ${adminUser.role}`);
        } else {
            console.log('\n⚠️  WARNING: Admin user not found!');
        }

        // Count users after cleanup
        const totalAfter = await User.countDocuments();
        console.log(`\nTotal users after cleanup: ${totalAfter}`);

        await mongoose.connection.close();
        console.log('\n✅ Database cleanup completed successfully');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupDatabase();
