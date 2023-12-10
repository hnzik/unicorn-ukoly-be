import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


module.exports.connect = async () => {
    const server = await MongoMemoryServer.create({});
    await mongoose.connection.close();
    await mongoose.connect(server.getUri());
}


module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}