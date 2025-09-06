import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

import express from "express"
import dotenv from "dotenv";
dotenv.config();
const app = express();

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            // Through mongoose.connect , there is object returned of connection 
        console.log("Connected Succesfully", connectionInstance.connection)


    } catch (error) {
        console.log("MONGODB Connection error", error);
        process.exit(1)

    }
}

export default connectDB