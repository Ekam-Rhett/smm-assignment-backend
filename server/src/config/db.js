import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to MongoDB: ${connect.connection.host} `)
    } catch (err) {
        console.error(`Database connection error: ${err.message}`);
        process.exit();
    }
}

export default connectDB