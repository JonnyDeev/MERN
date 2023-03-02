import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        required: true,
        min: 5,
        
    },
    picturePath :{
        type: String,
        default:'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg',
        min: 2,
        max: 50
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    ocupation: String,
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true})



const User = mongoose.model('User', UserSchema)

export default User;