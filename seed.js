const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/keys.env' });
const Role = require('./models/Role.js');
const Permission = require('./models/Permission.js');

mongoose.connect(process.env.MONGO_DB_QUERY_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  return seedDatabase();
}).catch(err => {
  console.error('Connection error', err);
  process.exit(1);
});

async function seedDatabase() {
  try {
    // Clear existing data
    await Permission.deleteMany({});
    await Role.deleteMany({});

    // Define permissions
    const permissions = [
      { name: 'link', description: 'Allows linking resources' },
      { name: 'delete', description: 'Allows deleting resources' },
      { name: 'approve', description: 'Allows approving resources' }
    ];

    // Insert permissions into the database
    const insertedPermissions = await Permission.insertMany(permissions);
    console.log('Permissions inserted');

    // Extract permissions by name for easy reference
    const permissionMap = insertedPermissions.reduce((map, perm) => {
      map[perm.name] = perm;
      return map;
    }, {});

    // Define roles with associated permissions
    const roles = [
      { name: 'admin', permissions: [permissionMap['link']._id, permissionMap['delete']._id] },
      { name: 'partner', permissions: [permissionMap['link']._id] },
      { name: 'approver', permissions: [permissionMap['approve']._id] }
    ];

    // Insert roles into the database
    await Role.insertMany(roles);
    console.log('Roles inserted');
  } catch (error) {
    console.error('Seeding error', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}