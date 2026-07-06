const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "user"
    },
    name: {
        type: String,
        trim: true
    },
    rank: {
        type: String,
        trim: true
    },
    appointment: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        default: null
    },
    phone: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "staff",
    },
    status: {
        type: String,
        default: "active",
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;