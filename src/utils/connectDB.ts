import mongoose from 'mongoose';

const localUri = process.env.MONGODB_LOCAL_URI as string;
const connection: any = {};
let mongo: mongoose.Connection | null = null;
export async function connectDB() {
  if (connection.isConnected) {
    console.log('DB 연결확인');
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(localUri);
  console.log('? MongoDB Database Connected Successfully');
  connection.isConnected = db.connections[0].readyState;
  mongo = db.connections[0];
}

export async function disconnectDB() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not discounted');
    }
  }
}
export function getDB() {
  if (connection.isConnected) {
    return mongo;
  } else {
    return false
  }
}