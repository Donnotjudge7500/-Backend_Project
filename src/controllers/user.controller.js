import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';


const registerUser = asyncHandler( async (req, res) => {
    // Get user details from the frontend
    // Validation - not empty
    // Check if user already exits: username, email
    // Check for Images, check for avatar
    // Upload them to cloudinary, check for avatar
    // Create user object - create entry in db
    // Remove password and refresh token fields from the response
    // Check for user creation
    // return res (response)



    // Get user details from the frontend:
    const { username, email, fullname, password } = req.body

    // Validation - not empty
    if (
        [username, email, fullname, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are required")
    }

    // Check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ username }, { email }] // Using (or)operator to check for multiple values.
    })

    if (existedUser) {
        throw new ApiError(409, 'User with email or username already exists!!')
    }

    // Using a middleware in user.routes file to store the avatar and coverImage in the public folder before registering the user. Go and see...
    // Now the 'req.body' gives us the data as we have seen above but, 'req.files' provided by multer gives access to the files we upload on our server ("public", folder), and it provides many features which can use.
    // Check for the avatar,(By retriving the path from the local server we can check wether the avatar is there or not.)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // Similarly for the "coverImage"
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // Check for avatarLocalPath, if not exists then throw error
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    // Upload them to cloudinary , check for avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);  
    const coverImage = uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    // Create user object - create user entry in db
    const user = await User.create({
        username : username.toLowerCase(),
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
    })

    // Confirmation for user is created or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // By using the "select" method we have removed the password and the refreshToken fields from the response.

    // Check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user!!")
    }

    // return res(response)
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

export { registerUser }