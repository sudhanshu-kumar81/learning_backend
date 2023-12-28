import mongoose,{Schema, schema} from 'mongoose'

const userSchema=new Schema(
    {
        username:{
            type:string,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:string,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:string,
            required:true,
            trim:true,
            index:true
        },
        avtar:{
            type:string,//cloudnary url
            required:true,
        },
        coverImage:{
            type:string,//cloudnary img
        },
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"video"
        },
        password:{
            type:String,
            required:[true,'password is required']
        },
        refreshToken:{
            type:string
        }
    },{timestamps:true}
)
userSchema.pre("save",async function(next){
    if(this.isModified("password"))return next();
    this.password=bcryt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcryt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
   JsonWebTokenError.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname
   },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})

}
userSchema.methods.generateRefreshToken=function(){
    JsonWebTokenError.sign({
        _id:this._id
       },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
export const User=mongoose.model("User",userSchema)