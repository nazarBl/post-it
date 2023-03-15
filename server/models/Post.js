const mongoose = require('mongoose');

const PostSchem = new mongoose.Schema({
        title:{
            type:String,
            required: true,
        },
        text:{
            type:String,
            required:true,
            unique:true,
        },
        author:{ //Choose type as id of user and link it to Model with that id
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tags:{
            type:Array,
            default:[]
        },
        viewsCount:{
            type:Number,
            default: 0,
        },
        imageUrl:String,
},{
    timestamps:true
})

module.exports = mongoose.model('Post', PostSchem)