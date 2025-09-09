// Will be used for file uploads 
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // So this file.originalname is the name by which user has uploaded the file 
        // You can add more security to it , 7:39:10
        // This is simple but not always secure, since two users uploading files with the same name could overwrite each other’s files.
        // That’s why many apps use Date.now() or UUIDs to generate unique names
        cb(null, file.originalname)
    }
})
// This storage method returns the file Name 
export const upload = multer({
    storage
})