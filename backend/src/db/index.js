import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstane = await mongoose.connect(`mongodb+srv://mo354598:osama@youtube.zxvvz.mongodb.net/${DB_NAME}`, {
            serverSelectionTimeoutMS: 5000,
            family: 4 
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB