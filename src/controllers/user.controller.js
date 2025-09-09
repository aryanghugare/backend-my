import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponses.js";
const registerUser = asyncHandler(async (req, res) => {
    // get the user details from frontend 
    // this is taken through postman 
    // look how to do file handling 
    // validation - not empty 
    // check if user already exist : username,email // Any field can be used for the checking 
    // check for images , check for avatar 
    // upload these images on cloudinary , and again check whether the avatar is uploaded or not 
    // create user object - create entry in db.   .create()
    // remove password and refresh token field from response 
    // check for user creation 
    // return res 


    const { fullName, email, username, password } = req.body // the data coming from form and json of frontend is catch by req.body 
    console.log(req.body);
    console.log(req.files);


    // console.log("email", email);
    // checking every validation manually 
    /* if (fullName === "") {
        throw new ApiError(400, "fullName is required")

    }
*/
    // This are the validation 
    // These is validation to check whether any field is empty or not 
    // These are the required fields
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "") // .some() is the array method 
    ) {
        throw new ApiError(400, "All fields are required ")
    }
    // validation for email address to have "@"
    if (!email.includes("@")) {
        throw new ApiError(408, "Enter a proper Email address  ")
    }

    // To check whether user already exits or not 
    // Now this User thing will call the mongDb in behalf of me whenever i need to 

    const existedUser = await User.findOne({
        $or: [{ username }, { email }] // This $or to check both username and email at the same time 
        // we can also use                const existingUser = await User.findOne({ email });
    }); // User.find() can also be used 

    if (existedUser) {
        throw new ApiError(409, "User with email or username already registered")
    }


    // Correct optional chaining syntax for accessing avatar path
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path
    // req.files is because of multer middleware that we have used 
    // express gives access to req.body


    // we dont have any checks for coverImage is there or not 
    // So for that 

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    // There are may ways to check this coverImage 
    // So the thing with coverImage is , this is not compulsory field(required)
    // So if the user has not uploaded any coverImage , so it should be shown as empty 
    // But this is not the case with avatar 
    // avatar is required field 


    // checking whether the avatar is present or not 
    if (!avatarLocalPath) {
        throw new ApiError(403, "Avatar file is missing ")
    }

    // Uploading these images on cloudinary 
    // Taking thier references in the variables 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // Checking the avatar is there or not 
    if (!avatar) {
        throw new ApiError(412, "Avatar has been not uploaded properly on cloudinary ")
    }

    // Create the entry on the database 
    // await is used because while storing , there can be error from the database 
    // Also remember the database is always in different contintent 
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // To see whether this data is created in database or not 
    // The thing is whenever there is a new entry in database there is field of _id generated it with it 
    // So to find whether the entry is created , we will use   User.findById(user._id)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // Through .select() we dont want password and refreshToken details 


    if (!createdUser) {
        throw new ApiError(447, "User has not been created on database ")
    }

    // return new ApiResponse(200, createdUser, "User has been created successfully").    this is wrong 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully"))


})


export { registerUser }