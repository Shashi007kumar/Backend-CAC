import dotenv from "dotenv"

import express from "express"
import connectDb from './db/db.js';
const app = express()


dotenv.config({path: './env'})

connectDb();
// First Approach to connect with DB 
/*
//IFEE
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR:",error)
    }
})()

*/

