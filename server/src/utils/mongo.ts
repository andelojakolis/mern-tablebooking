import mongoose from "mongoose";
import config from "../../config/default"

export async function connectToMongo() {
    try {
        await mongoose.connect(config.dbUri)
        console.log("Connected to DB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}