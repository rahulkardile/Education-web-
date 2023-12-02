import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    
    },
    password: {
        type: String,
        required: true,
        max: 20,
        min: 7,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {timestamps: true}
)

const User = new mongoose.model('User', userSchema);

export default User