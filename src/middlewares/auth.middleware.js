// The middlewares are mostly used in routes 


import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    // So here we can replace res by _ , because that is done in industry or production grade programs 
    try {

        // so the req has all the access to the cookies because we used app.use(cookieParser()) in app.js file 
        const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // For headers this can also be done const token = req.headers("authorization")?.split(" ")[1]; 
        // Through this method also we can get access Token
        // for the mobile application , the headers are send , soo there are dealed with here 
        // Mobile apps (iOS/Android) usually don’t rely on cookies.
        // Instead, they store tokens (access + refresh) in secure storage (like Keychain on iOS, EncryptedSharedPreferences on Android).
        // They send tokens inside the Authorization header:

        if (!Token) {
            throw new ApiError(433, "You dont have acces to this data  ")

        }
        const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) throw new ApiError(404, "Invalid Acces Token")
        req.user = user;
        next()
        // Give the user access to the req , which can be used in user.controller.js




    } catch (error) {

        throw new ApiError(489, error?.message || "Invalid acces token ")
    }
})