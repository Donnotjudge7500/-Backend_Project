import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true  // More optimized for the searching pupose.
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String, // we use third party service and save the url here.
        required: true,
    },

    coverImage: {
        type: String, // we use third party service and save the url here.
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    refreshToken: {
        type: String
    },
},
{ timestamps: true });


export const User = mongoose.model("User", userSchema);