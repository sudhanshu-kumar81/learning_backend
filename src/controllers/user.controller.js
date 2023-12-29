import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
   //get user details from frontend
   //validation-not empty
   //check if user already exist
   //check for images
   //check for avtar
   //upload them from cloudnary
   //create user object-create entry in db
   //remove password and refresh tpkens from response
   //check for user creation
   //return res
   const {fullname,email,username,password}=req.body
//    if(fullname===""){
//         throw new ApiError(400,"full name is required")
//    }
if([fullname,email,username,password].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"all fields are required")
}
const existedUser=await User.findOne({
    $or:[{username} ,{email}]
})
if(existedUser){
    throw new ApiError(409,"User with email already exist")
}
   const avatarLocalPath=req.files?.avatar[0]?.path
   
//    const coverImageLocalPath=req.files?.coverImage[0]?.path//gives error with null no coverimage
      
    let coverImageLocalPath="";
   if(req.files&&Array.isArray(req.files)&&req.files.coverImage.length>0){
       coverImageLocalPath=req.files.coverImage[0].path
   }

   if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required for avtar local path")
   }
   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)
   if(!avatar){
    throw new ApiError(400,"avatar file is required after uploading")
   }
  const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()

   })
   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,"somethong went wrong while registering data")
   }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
   )
   

})
export {registerUser}