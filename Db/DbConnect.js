import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true, // Add any other options you need here
    };

    const connection = await mongoose.connect(MONGODB_URI, opts);
    cachedConnection = connection;
    return cachedConnection;
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
