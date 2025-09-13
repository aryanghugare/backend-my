import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    //  I have added this in my schema to trace the name of the tweet creater 
    name: {
        type: String,

    }
}, { timestamps: true })


export const Tweet = mongoose.model("Tweet", tweetSchema)