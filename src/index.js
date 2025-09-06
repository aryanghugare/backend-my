// mongoose is used to connect the database 
// Wrap the database responses in try catch , so to handle it perfectly 

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express"
import dotenv from "dotenv";
dotenv.config(); // load .env file
const app = express();

// (Immediately Invoked Function Expression) is used here 
// we can also use normal function and then normally call them 
// it wiil be the same as Immediately Invoked Function Expression)
// DB connection code 
(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Connected Succesfully")
        app.on("error", (error) => {
            console.log("EROR:", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is Listening on port ${process.env.PORT}`);

        });

    } catch (error) {
        console.log(error);
        throw error;

    }


})();





// 1st way to do mongoDb connection 
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express";
// import dotenv from "dotenv";

// dotenv.config(); // load .env file

// const app = express();

// (async() => {
//     try {
//         // Mongo connection
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log("✅ MongoDB connected successfully");

//         // Error handling for express app
//         app.on("error", (error) => {
//             console.error("Express error:", error);
//             throw error;
//         });

//         // Start server
//         app.listen(process.env.PORT, () => {
//             console.log(`🚀 App is listening on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("❌ MongoDB connection failed:", error);
//         throw error;
//     }
// })();