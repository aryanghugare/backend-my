import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema(

        {
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
                index: true,
                // index:true is used if there is lot of searching in the field  
            },

            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
            },

            fullName: {
                type: String,
                required: true,
                trim: true,
                index: true
            },
            avatar: {
                type: String, // cloudinary url 
                required: true,
            },

            coverImage: {
                type: String, // cloudinary url 
            },

            watchHistory: [{
                type: Schema.Types.ObjectId,
                ref: "Video"
            }, ],

            password: {
                type: String,
                required: [true, 'Password is required'],
                unique: true,

            },

            refreshToken: {
                type: String,

            }




        }, { timestamps: true }

    )
    // Here callback function is not arrow function because 
    // arrow function does not has 'this' reference 
    // Therefore normal function is used here 
userSchema.pre('save', async function(next) {

    if (this.isModified("password")) { // This if loop is because , when there will be changes in password or password is enter the first time  , then only the following hook of encrypting password is used 

        this.password = bcrypt.hash(this.password, 10) // 10 here is number of rounds 
        next()
            /*
                    The next() function is a callback provided by Mongoose.
                    It’s how you tell Mongoose:
                    👉 “I’m done with whatever I was doing in this hook, now move on to the next middleware or finish the operation.”
            */
    }

})

// This is the method to validate the password 
userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare(password, this.password)
    }
    // No need for async 
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,


        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,


        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )



}






export const User = mongoose.model("User", userSchema)