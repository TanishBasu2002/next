import { MongoClient, ObjectId } from 'mongodb';

// Replace with your actual MongoDB connection string
const MONGODB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/your-database-name';

async function main() {
  const client = new MongoClient(MONGODB_URL);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data (optional)
    console.log('Clearing existing data...');
    await db.collection('chats').deleteMany({});
    await db.collection('users').deleteMany({});
    
    // Create users
    console.log('Creating users...');
    
    const clientUser = {
      _id: new ObjectId(),
      email: 'client@example.com',
      name: 'John Client',
      role: 'client',
      is_active: true,
      is_email_verified: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    
    const adminUser = {
      _id: new ObjectId(),
      email: 'admin@example.com',
      name: 'Jane Admin',
      role: 'practitioner',
      profession: 'Therapist',
      is_active: true,
      is_email_verified: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    
    // Insert users
    await db.collection('users').insertMany([clientUser, adminUser]);
    console.log('Users created successfully');
    
    // Create chat
    console.log('Creating chat...');
    const chat = {
      _id: new ObjectId(),
      clientId: clientUser._id.toString(),
      practitionerId: adminUser._id.toString(),
    };
    
    await db.collection('chats').insertOne(chat);
    console.log('Chat created successfully');
    
    console.log('Seeding completed!');
    console.log('Created users:', {
      client: { id: clientUser._id.toString(), email: clientUser.email },
      admin: { id: adminUser._id.toString(), email: adminUser.email }
    });
    console.log('Created chat:', { id: chat._id.toString() });
    
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await client.close();
  }
}

main()
  .then(() => {
    console.log('Seed script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });