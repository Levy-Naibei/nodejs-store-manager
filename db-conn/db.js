const mongoose = require('mongoose');

// establish mongodb connection
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            poolSize: 10,
            bufferMaxEntries: 0,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);        
    }
}

module.exports = connectDB;