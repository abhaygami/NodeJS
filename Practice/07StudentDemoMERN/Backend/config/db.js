import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connection established");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error.message);
        process.exit(1);
    }
}

export default ConnectDB;