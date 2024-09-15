import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)


// We have used a middleware('upload') to store the "avatar" and "coverImage" in the "public" folder on our server before registering the user. Go to the middleware folder to see what does the "upload" middleware do.

export { router }