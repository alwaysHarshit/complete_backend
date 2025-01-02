import mongoose from "mongoose";
import moongoseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true, //if you do too much search
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avtar:{
            type: String,
            required: true,
        },
        coverImage:{
            type: String,
        },
        watchHistory:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
       password:{
           type: String,
           required: [true , "Password is required"],
       },
        refreshToken:{
        tye: String,
        }
    },
    { timestamps: true }
);
userSchema.plugin(moongoseAggregatePaginate);

userSchema.pre(("save"), async function(next){//dont use arrow function
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//creating a custom method to compare password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password);
}
//creating a custom method to generate token
userSchema.methods.generateAccessToken = function(){
   return  jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User', userSchema);