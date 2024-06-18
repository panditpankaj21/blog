const mongoose = require('mongoose')

const connectDB = async (path) => {
    try{

        const connectionInstance = await mongoose.connect(path)
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)

    }catch(err){
        console.log("MongoDB connection error: ", err);
        process.exit(1);
    }
}

module.exports = connectDB