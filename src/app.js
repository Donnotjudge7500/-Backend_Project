import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
})) //Configuring CORS.


app.use(express.json({ limit: "16kb" }))//Data from forms.
app.use(express.urlencoded({ extended: true, limit: "16kb" }))//Data comming from url.
app.use(express.static("public")) //Media Files storage.
app.use(cookieParser())


//routes import
import { router } from './routes/user.routes.js';

app.use("/api/v1/users", router)

export { app }