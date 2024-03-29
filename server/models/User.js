const mongoose = require('mongoose');

const UserSchem = new mongoose.Schema({
        fullName:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required: true,
        },
        regTime:String,
        avatarUrl:{
            type:String,
            default:'/uploads/avatars/noavatar.png'
        }
},{
    timestamps:true
})

module.exports = mongoose.model('User', UserSchem)