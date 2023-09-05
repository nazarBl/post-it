const { mongoose } = require('mongoose')
const PostModel = require('../models/Post')
const { ObjectId } = require('mongodb')

const dataConverter = (data)=>{ // Changes time format to more readable for client
    if (data.length){
        for(post of data){
            let month =post.createdAt.toString().split(' ')[1]
            let year = post.createdAt.toString().split(' ')[3]
            let dayOfTheMonth = post.createdAt.toString().split(' ')[2]
            let time =post.createdAt.toString().split(' ')[4].split(':').slice(0,2).join(':');
            post.dateOfCreate =[dayOfTheMonth, month, year, time].join(' ');
        }
    } else {
        if(data){
            let month =data.createdAt.toString().split(' ')[1]
            let year = data.createdAt.toString().split(' ')[3]
            let dayOfTheMonth = data.createdAt.toString().split(' ')[2]
            let time =data.createdAt.toString().split(' ')[4].split(':').slice(0,2).join(':');
            data.dateOfCreate =[dayOfTheMonth, month, year, time].join(' ');
        }
    }
   
    return data
}

module.exports = {
    createPost: async (req, res)=>{
        try {
            const newPost = PostModel.create({
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                commentsCount:0,
                tags: req.body.tags?.split(','),
            })

            res.status(201).json(newPost)
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error:'Failed to create new post'
            })
        }
    },
    getAllPosts: async (req, res)=>{
        try {
            const tagName=req.query.tagName
            if (tagName) {
                const postsByTag = await PostModel.find({tags:tagName}).populate('author')
                dataConverter(postsByTag);
                return res.json(postsByTag)
            }
        const posts = await PostModel.find().sort({createdAt:-1}).populate('author').exec();
        dataConverter(posts);
        res.status(200).json(posts)

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error:'Cannot receive posts from server'
            })
        }
    },
    getPostById: async (req, res)=>{
        try {
            const postId = req.params.id;

            // Check if id is correct
            if(!mongoose.Types.ObjectId.isValid(postId)) {
                return res.status(404).json({error:'Post was not found!'})
            } 

            const post = await PostModel.findOneAndUpdate(
                {
                    _id: postId,
                },
                {
                    $inc: {viewsCount: 1 },
                },
                {
                    returnDocument: 'after',
                }
            ).populate('author')
            dataConverter(post)
            if(!post){
                return res.status(404).json({msg:'Post was not found!'})
            }
            res.status(200).json(post)
   
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error:'Cant receive a post from server'
            })
        }
    },
    getPopularPosts: async (req, res)=>{
        try {
            const popularPosts = await PostModel.find().sort({"viewsCount":-1}).populate('author')
            dataConverter(popularPosts)    
            return res.json(popularPosts)
        } catch (error) {
            console.log(error.message);
            res.status(500).json({error:error.message})
        }
    },
    getMyPosts: async(req,res)=>{
        try {
            const myPosts = await PostModel.find({author: new ObjectId(req.userId)}).populate('author')
            dataConverter(myPosts);
            return res.json(myPosts)
        } catch (error) {
            console.log(error.message);
            res.status(500).json({"error":error.message})
        }
    },
    removePost: async (req,res)=>{
        try {
            const _id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(_id)){
                return res.status(404).json({error:'Post was not found!'})
            }
            const postToDelete = await PostModel.findOneAndDelete(
                {
                    _id
                },
                res.status(200).json({
                    msg:'Post was succesfully deleted',
                })
            )
            if(!postToDelete){
                return res.status(404).json({error:'Post was not found'})
            }
            
        } catch (error) {
            console.log(error.message);
            res.json(500).json({
                error:'Post was not deleted (server error)'
            })
        }
    },
    updatePost: async (req,res)=>{
        try {
            const _id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(_id)){
                return res.status(404).json({error:'Post was not found'})
            }
                await PostModel.findByIdAndUpdate({
                    _id,
                },
                {
                    title:req.body.title,
                    text: req.body.text,
                    imageUrl: req.body.imageUrl,
                    author: req.userId,
                    viewsCount: req.body.viewsCount,
                    tags: req.body.tags.replace(' ','').split(','),
                })
            
            res.status(200).json({
                message:'Post was successfully updated',
            })
        } catch (error) {
            console.log(error.message);
            res.json(500).json({
                error:'Post updating failed (server error)',
            })
        }
    }
}