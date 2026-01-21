import dbConnect from "./source/database/dbConnect.js";
import app from "./app.js"
import ApiError from "./source/utils/ApiError.js";
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 7000

dbConnect()
    .then(() => {
        app.listen(port, ()=>{
            console.log("App listen on the port number", port)
        })
    })
    .catch((err)=>{
        console.error("Database connection error:", err);
        throw new ApiError(505, "failed to connect with the database")
    })