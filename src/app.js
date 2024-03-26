import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({ limit: "16kb" })) // Accepting the 16kb of json.
app.use(express.urlencoded({ extended: true, limit: "16kb" })) //Encoding the url.
app.use(express.static("public")) // public folder used to keep static files.
app.use(cookieParser()) // Used to access the cookies of the user's browser.

export { app };