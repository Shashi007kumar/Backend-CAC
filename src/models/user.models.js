import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"  // jwt(json web token) is bearer token 
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String, 
        required: true, 
        trim: true,
        index: true
    },
    avatar: {
        type: String, // we are using cloudnary url
        required: true,

    },
    coverImage: {
        type: String, 

    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

// pre is a hook used to write logic just before data save in DB
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)      // bcrypt is for password encryption
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User  = mongoose.model("User", userSchema)
// The model name User will save in DB as Users(prural) it is monoDb standard