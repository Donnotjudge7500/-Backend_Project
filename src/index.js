// require('dotenv').config({path: './env'})  This is one of the way to use it.

import dotenv from 'dotenv';  
import connectDB from './db/index.js'; 



dotenv.config({
    path: './env'
})


connectDB()
    .then(() => {
        app.on("error:", (error) => {
            console.log("ERR: ", error)
        })
        
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err)
    })








/*
import express from 'express';
const app = express()

----- Method 1 for connecting to the Database. Good Approach.-----
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error:", (error) => {
            console.log("ERR: ", error)
        })


        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${ process.env.PORT }`)
        })
    } catch (error) {
        console.error("ERROR :", error)
        throw error
    }
})()
*/