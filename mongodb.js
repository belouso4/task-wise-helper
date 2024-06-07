import mongoose from 'mongoose';

const DB_URL = process.env.NODE_ENV === 'production' ?
    `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASSWORD}@atlascluster.veuwmop.mongodb.net/${process.env.MDB_DATABASE}?retryWrites=true&w=majority&appName=AtlasCluster` :
    `mongodb://MongoDB-7.0:27017/${process.env.MDB_DATABASE}`

const MDBConnect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error(`DB connection error: ${error}`);
    }
};

export default MDBConnect;

