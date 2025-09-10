import { Router } from "express";
import { loginUser, registerUser, logOutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
// upload here is used as middleware to upload these images on the local disk/local Storage 
// So here upload.fields() is used , because we want to upload two things that is avatar and coverImage 
// if there was only one thing to upload we could use  upload.single()
router.route("/register").post(
    upload.fields([{
        name: "avatar",
        maxCount: 1

    },
    {
        name: "coverImage",
        maxCount: 1
    }

    ]),
    registerUser)
router.route("/login").post(loginUser);
// secured routes 
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken)

export default router;