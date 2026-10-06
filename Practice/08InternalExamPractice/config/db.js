import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection established");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
    }
}

export default ConnectDB;