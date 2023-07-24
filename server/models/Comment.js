const mongoose = require("mongoose")

const CommentSchem = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    parentPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    text:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isEditable:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Comment', CommentSchem)