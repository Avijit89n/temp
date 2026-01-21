import mongoose from "mongoose"
import AppError from "../utils/ApiError.js"

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`);
        console.log("Database connected to the database");
    } catch (error) {
        throw new AppError(505, "Failed to connect with database", error);
    }
}

export default dbConnect;
