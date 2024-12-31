import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadResult } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const userRegister = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;
  if (
    [userName, email, fullName, password].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  const existedUser = User.findOne({
    $or: [{email},{userName}]
  })

  if(existedUser){
    throw new ApiError(400, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const avatarURL = await uploadResult(avatarLocalPath);
  const coverImageURL = await uploadResult(coverImageLocalPath);

  if(!avatarURL){
    throw new ApiError(400, "Avatar is mandatory while registering!");
  }

  const user = User.create({
    userName,
    email,
    avatar: avatarURL,
    coverImage: coverImageURL || "",
    fullName,
    password,
    refreshToken
  })

  const createdUser = User.findById(user?._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering!");
  }

  return res.status(200).json(new ApiResponse(200, createdUser, "User Created Sucessfully!"))

});

export { userRegister };
