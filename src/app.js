import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
    // app.use() is the middleware 
    // To handle the cross origin resource sharing 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
        // many options to explore 
}))

// To handle all type of data 
// To accept the json files 
// To set the limit for json reponses 
app.use(express.json({ limit: "20kb" }))
    // To handle the URL 
app.use(express.urlencoded())

// To handle the public assets , which i want to store in my system 
// express.static() is built-in middleware in Express.
// It’s used to serve static files (files that don’t change on the server).
// Example static files: HTML, CSS, JavaScript, images, fonts, PDFs.
app.use(express.static("public"))

// To do the CRUD operation on the cookies 
app.use(cookieParser())


export default app