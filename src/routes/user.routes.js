import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

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

export default router;