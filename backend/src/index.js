// require('dotenv').config({path: './env'});
import dotenv from "dotenv"
import connecToDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: '../backend/.env'
})

const port = process.env.PORT || 3000;
connecToDB() //async function will return response so now using .then and .catch
    .then(() => {
        // app.on("error", ...) part is specifically related to handling errors that might occur within the Express application during its runtime. 
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error  //Throwing the error might be done to terminate the application
        })
        app.listen(port, () => {
            console.log(`App running at port: ${port}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
    })



