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
            const doc = new PostModel({
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                commentsCount:0,
                tags: req.body.tags.split(','),
            })

            const post = await doc.save()

            res.json(post)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Failed to create new post'
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
        res.json(posts)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message:'Cannot receive posts'
            })
        }
    },
    getPostById: async (req, res)=>{
        try {
            const postId = req.params.id;
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
    
            return res.json(post)
   
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Cant receive a post'
            })
        }
    },
    getPopularPosts: async (req, res)=>{
        try {
            const popularPosts = await PostModel.find().sort({"viewsCount":-1}).populate('author')
            dataConverter(popularPosts)    
            return res.json(popularPosts)
        } catch (error) {
            res.status(500).json({"error":"error.message"})
        }
    },
    getMyPosts: async(req,res)=>{
        try {
            const myPosts = await PostModel.find({author: new ObjectId(req.userId)}).populate('author')
            dataConverter(myPosts);
            return res.json(myPosts)
        } catch (error) {
            res.status(500).json({"error":error.message})
        }
    },
    removePost: async (req,res)=>{
        try {
            const postId = req.params.id;

            await PostModel.findOneAndDelete(
                {
                    _id:postId
                },
                res.json({
                    message:'Post was succesfully deleted'
                })
            )
            
        } catch (error) {
            console.log(error);
            res.json(404).json({
                message:'Post does not exist'
            })
        }
    },
    updatePost: async (req,res)=>{
        try {
            const _id = req.body.id;

            await PostModel.updateOne({
                _id,
            },
            {
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                commentsCount:req.body.commentsCount,
                comments:req.body.comments,
                tags: req.body.tags.replace(' ','').split(','),
            })

            res.json({
                message:'Post was successfully updated'
            })
        } catch (error) {
            console.log(error);
            res.json(500).json({
                message:'Post updating failed'
            })
        }
    }
}