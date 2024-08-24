/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';

import express from 'express';
const app = express()

//Using IIFE for invoking the connection immediately.
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("ERROR:", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`) 
        })

    } catch (error) {
        console.log("ERROR:", error)
        throw error
    }
})()
*/

import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

// The above code is one of the ways to initialze the app and connect to the database. Similarly we have another way to do the same thing.So, lets head towards other method:

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER is running at port : ${process.env.PORT}`);
        })

        app.on("error", (error) => {
            console.log("ERROR: ", error)
            throw error
        })
    })
    .catch((err) => {
        console.log(
            'MONGO DB Connection Failed !!!', err
        );
    });

dotenv.config({
    path: './env'
})